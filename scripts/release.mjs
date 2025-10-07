import { readFileSync, readFileSync as fsReadFileSync } from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

function sh(cmd, options = {}) {
  return execSync(cmd, { stdio: 'inherit', ...options });
}

function trySh(cmd) {
  try {
    execSync(cmd, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function getPkg() {
  const pkgPath = path.resolve(process.cwd(), 'package.json');
  const raw = readFileSync(pkgPath, 'utf8');
  return JSON.parse(raw);
}

function pkgTarballName(pkg) {
  // npm pack outputs like: <name>-<version>.tgz; scoped names replace @ and / with -
  const baseName = pkg.name.replace(/^@/, '').replace(/\//g, '-');
  return `${baseName}-${pkg.version}.tgz`;
}

function hasGh() {
  return trySh('gh --version');
}

function getRepoFromGit() {
  const url = execSync('git config --get remote.origin.url', { encoding: 'utf8' }).trim();
  // Handle HTTPS and SSH forms
  // https://github.com/OWNER/REPO.git
  // git@github.com:OWNER/REPO.git
  let owner = '';
  let repo = '';
  if (url.startsWith('git@')) {
    const match = url.match(/^git@github.com:(.+?)\/(.+?)(\.git)?$/);
    if (match) {
      owner = match[1];
      repo = match[2];
    }
  } else if (url.startsWith('https://') || url.startsWith('http://')) {
    const match = url.match(/github.com\/(.+?)\/(.+?)(\.git)?$/);
    if (match) {
      owner = match[1];
      repo = match[2];
    }
  }
  if (!owner || !repo) {
    throw new Error(`Unable to parse owner/repo from remote URL: ${url}`);
  }
  return { owner, repo };
}

async function createOrGetReleaseViaApi({ owner, repo, tag, token, title, notes }) {
  const headers = {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  // Try create first
  let release;
  let resp = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ tag_name: tag, name: title ?? tag, body: notes ?? '', draft: false, prerelease: false }),
  });

  if (resp.status === 422) {
    // Already exists — fetch by tag
    resp = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/tags/${encodeURIComponent(tag)}`, {
      headers: { ...headers, 'Content-Type': undefined },
    });
  }

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`GitHub API release error (${resp.status}): ${text}`);
  }

  release = await resp.json();
  return release; // includes id and assets
}

async function deleteAssetIfExists({ owner, repo, token, release, assetName }) {
  const existing = (release.assets || []).find(a => a.name === assetName);
  if (!existing) return;

  const headers = {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Authorization': `Bearer ${token}`,
  };
  const resp = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/assets/${existing.id}`, {
    method: 'DELETE',
    headers,
  });
  if (!resp.ok && resp.status !== 404) {
    const text = await resp.text();
    throw new Error(`Failed to delete existing asset: ${resp.status} ${text}`);
  }
}

async function uploadAssetViaApi({ owner, repo, token, releaseId, filePath, assetName }) {
  const url = `https://uploads.github.com/repos/${owner}/${repo}/releases/${releaseId}/assets?name=${encodeURIComponent(assetName)}`;
  const headers = {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/gzip',
  };
  const data = fsReadFileSync(path.resolve(process.cwd(), filePath));
  const resp = await fetch(url, { method: 'POST', headers, body: data });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Asset upload failed (${resp.status}): ${text}`);
  }
}

async function main() {
  const bump = process.argv[2] || 'patch'; // patch | minor | major
  if (!['patch', 'minor', 'major'].includes(bump)) {
    console.error('Invalid bump type. Use: patch | minor | major');
    process.exit(1);
  }

  // Preflight auth tooling: require gh CLI OR a token before making any changes
  const ghAvailable = hasGh();
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '';
  if (!ghAvailable && !token) {
    console.error('Neither GitHub CLI (gh) is installed nor GITHUB_TOKEN/GH_TOKEN is set.');
    console.error('Install GitHub CLI and run "gh auth status", or set an env token with repo scope:');
    console.error('  PowerShell:  $env:GITHUB_TOKEN = "<token>"');
    console.error('  bash/zsh:    export GITHUB_TOKEN="<token>"');
    process.exit(1);
  }

  // Ensure workspace is clean
  try { sh('git diff --quiet'); } catch {
    console.error('Working tree is dirty. Commit or stash changes before releasing.');
    process.exit(1);
  }

  // Bump version (creates a commit and tag)
  sh(`npm version ${bump} -m "release: v%s"`);

  // Read new version
  const pkg = getPkg();
  const version = pkg.version;

  // Build and pack tarball
  sh('npm run build');
  sh('npm pack');

  const tarball = pkgTarballName(pkg);

  // Push commit and tag
  sh('git push');
  sh('git push --tags');

  // Create GitHub Release and upload asset
  const tag = `v${version}`;
  if (ghAvailable) {
    try {
      sh(`gh release create ${tag} --title ${tag} --notes "release ${tag}" ${tarball}`);
    } catch (e) {
      // If release exists, just upload/clobber asset
      try {
        sh(`gh release upload ${tag} ${tarball} --clobber`);
      } catch (e2) {
        throw e2;
      }
    }
  } else {
    // REST API fallback using token
    const { owner, repo } = getRepoFromGit();
    const release = await createOrGetReleaseViaApi({ owner, repo, tag, token, title: tag, notes: `release ${tag}` });
    await deleteAssetIfExists({ owner, repo, token, release, assetName: tarball });
    await uploadAssetViaApi({ owner, repo, token, releaseId: release.id, filePath: tarball, assetName: tarball });
  }

  // Print exact install commands for consuming codebases
  try {
    const { owner, repo } = getRepoFromGit();
    const downloadUrl = `https://github.com/${owner}/${repo}/releases/download/${tag}/${tarball}`;
    const pkgName = pkg.name;
    console.log(`\nRelease ${tag} created with asset: ${tarball}`);
    console.log(`\nTo import this build into another codebase, run one of the following:`);
    console.log(`  npm install ${downloadUrl}`);
    console.log(`  pnpm add ${downloadUrl}`);
    console.log(`  yarn add ${downloadUrl}`);
    console.log(`\nAlternatively, pin to the package name with a URL:`);
    console.log(`  npm install ${pkgName}@${downloadUrl}`);
  } catch (_) {
    console.log(`\nRelease ${tag} created with asset: ${tarball}`);
  }
}

// Node 18+ has global fetch; ensure it exists
if (typeof fetch === 'undefined') {
  console.error('This script requires Node 18+ with global fetch.');
  process.exit(1);
}

// Top-level await wrapper
main().catch((err) => {
  console.error(err?.stack || err?.message || String(err));
  process.exit(1);
});
