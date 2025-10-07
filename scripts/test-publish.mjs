#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { execSync, spawnSync } from 'node:child_process';

function assert(cond, msg) {
  if (!cond) {
    throw new Error(msg);
  }
}

function readPkg() {
  const pkgPath = path.resolve(process.cwd(), 'package.json');
  return JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
}

function pkgTarballName(pkg) {
  const baseName = pkg.name.replace(/^@/, '').replace(/\//g, '-');
  return `${baseName}-${pkg.version}.tgz`;
}

function listTar(tarPath) {
  // Try to list contents of a .tgz using system tar (bsdtar is available on modern Windows/PowerShell as tar)
  let out = '';
  let ok = false;
  for (const cmd of ['tar']) {
    const res = spawnSync(cmd, ['-tf', tarPath], { encoding: 'utf8' });
    if (res.status === 0) {
      out = res.stdout;
      ok = true;
      break;
    }
  }
  return { ok, files: ok ? out.split(/\r?\n/).filter(Boolean) : [] };
}

function discoverSrcFiles(srcDir, exts) {
  const abs = path.resolve(process.cwd(), srcDir);
  if (!fs.existsSync(abs)) return [];
  return fs.readdirSync(abs, { withFileTypes: true })
    .filter(d => d.isFile() && exts.includes(path.extname(d.name)))
    .map(d => path.basename(d.name, path.extname(d.name)));
}

function fileExists(p) {
  try {
    fs.accessSync(p, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function main() {
  console.log('Running build...');
  execSync('npm run build', { stdio: 'inherit' });

  // Verify dist structure for root index
  const dist = path.resolve(process.cwd(), 'dist');
  assert(fs.existsSync(dist), 'dist directory was not created');
  const indexFiles = ['index.mjs', 'index.cjs', 'index.d.ts'];
  for (const f of indexFiles) {
    const p = path.join(dist, f);
    assert(fileExists(p), `Missing ${f} in dist`);
  }

  // Verify mocks and EventPage components were emitted as separate entries
  const mockBases = discoverSrcFiles('src/mocks', ['.ts', '.tsx']);
  const eventPageBases = discoverSrcFiles('src/components/EventPage', ['.tsx', '.ts']);

  const outChecks = [];
  for (const base of mockBases) {
    outChecks.push(path.join(dist, 'shared-ui', 'mocks', `${base}.mjs`));
    outChecks.push(path.join(dist, 'shared-ui', 'mocks', `${base}.cjs`));
    outChecks.push(path.join(dist, 'shared-ui', 'mocks', `${base}.d.ts`));
  }
  for (const base of eventPageBases) {
    outChecks.push(path.join(dist, 'shared-ui', 'components', 'EventPage', `${base}.mjs`));
    outChecks.push(path.join(dist, 'shared-ui', 'components', 'EventPage', `${base}.cjs`));
    outChecks.push(path.join(dist, 'shared-ui', 'components', 'EventPage', `${base}.d.ts`));
  }

  for (const outPath of outChecks) {
    assert(fileExists(outPath), `Expected built file missing: ${path.relative(process.cwd(), outPath)}`);
  }

  // Pack and verify tarball presence and contents include dist paths
  console.log('Packing tarball with npm pack...');
  const packOut = execSync('npm pack', { encoding: 'utf8' });
  const pkg = readPkg();
  const tarball = pkgTarballName(pkg);
  const tarPath = path.resolve(process.cwd(), tarball);
  assert(fileExists(tarPath), `npm pack did not produce expected tarball: ${tarball}`);

  // Try to list tar contents
  const { ok, files } = listTar(tarPath);
  if (!ok) {
    console.warn('Warning: Could not list tarball contents (no system tar found). Skipping deep tar validation.');
  } else {
    // Check a sample of files to ensure structure is included inside tarball
    const expectedInTar = [];
    expectedInTar.push('package/dist/index.mjs');
    for (const base of mockBases) {
      expectedInTar.push(`package/dist/shared-ui/mocks/${base}.mjs`);
    }
    for (const base of eventPageBases) {
      expectedInTar.push(`package/dist/shared-ui/components/EventPage/${base}.mjs`);
    }
    for (const exp of expectedInTar) {
      assert(files.includes(exp), `Tarball is missing expected file: ${exp}`);
    }
  }

  // Clean up the generated tarball so the repo stays tidy for devs
  try {
    fs.unlinkSync(tarPath);
  } catch {}

  console.log('Test passed: build and package layout verified.');
}

try {
  main();
} catch (err) {
  console.error('\nTest failed:', err?.message || err);
  process.exit(1);
}
