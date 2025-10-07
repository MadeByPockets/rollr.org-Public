import { readFileSync } from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

function sh(cmd, options = {}) {
  return execSync(cmd, { stdio: 'inherit', ...options });
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

function main() {
  const bump = process.argv[2] || 'patch'; // patch | minor | major
  if (!['patch', 'minor', 'major'].includes(bump)) {
    console.error('Invalid bump type. Use: patch | minor | major');
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

  // Create GitHub Release and upload asset using gh CLI
  // Requires GH CLI installed and authenticated; GITHUB_TOKEN works in CI
  const tag = `v${version}`;
  try {
    sh(`gh release create ${tag} --title ${tag} --notes "release ${tag}" ${tarball}`);
  } catch (e) {
    // If release exists, just upload asset
    sh(`gh release upload ${tag} ${tarball} --clobber`);
  }

  console.log(`\nRelease ${tag} created with asset: ${tarball}`);
}

main();
