import { defineConfig } from 'tsup';
import fs from 'node:fs';
import path from 'node:path';

// Auto-generate entry points so new files are included without manual updates.
// We preserve the desired output structure under dist/shared-ui/* by aliasing
// keys in the entry map accordingly.
function discoverEntries() {
  const entries = {
    // keep root index for main/module/types
    index: 'src/index.ts',
  } as Record<string, string>;

  const extsAll = ['.ts', '.tsx'];

  const shouldSkip = (fileName: string) => {
    if (fileName.endsWith('.d.ts')) return true;
    if (/(test|spec|stories)\.(ts|tsx)$/.test(fileName)) return true;
    return false;
  };

  const toPosix = (p: string) => p.replace(/\\/g, '/');

  // Recursively add file entries (excluding index files) under srcDir
  const addDirDeep = (srcDir: string, outPrefix: string, exts: string[]) => {
    const absDir = path.resolve(process.cwd(), srcDir);
    if (!fs.existsSync(absDir)) return;
    const walk = (curAbs: string, rel = '') => {
      const items = fs.readdirSync(curAbs, { withFileTypes: true });
      for (const it of items) {
        const abs = path.join(curAbs, it.name);
        const relPath = rel ? `${rel}/${it.name}` : it.name;
        if (it.isDirectory()) {
          if (it.name === 'node_modules' || it.name.startsWith('.')) continue;
          walk(abs, relPath);
        } else if (it.isFile()) {
          const ext = path.extname(it.name);
          if (!exts.includes(ext)) continue;
          if (shouldSkip(it.name)) continue;
          // Skip index files — they'll be represented by explicit folder-level entries
          const baseNoExt = relPath.replace(/\.(ts|tsx)$/i, '');
          if (/(^|\/)index$/i.test(baseNoExt)) continue;
          const key = `${outPrefix}/${baseNoExt}`;
          const val = toPosix(path.join(srcDir, relPath));
          entries[key] = val;
        }
      }
    };
    walk(absDir);
  };

  // Add folder-level entries for every directory that has an index.ts/tsx
  const addFolderIndexEntries = (srcBaseDir: string, outBasePrefix: string, alias: (relDir: string) => string = (s) => s) => {
    const absBase = path.resolve(process.cwd(), srcBaseDir);
    if (!fs.existsSync(absBase)) return;
    const walk = (curAbs: string, rel = '') => {
      const indexTs = path.join(curAbs, 'index.ts');
      const indexTsx = path.join(curAbs, 'index.tsx');
      let idx: string | null = null;
      if (fs.existsSync(indexTs)) idx = indexTs;
      else if (fs.existsSync(indexTsx)) idx = indexTsx;
      if (idx) {
        const relDir = rel; // '' for root folder itself
        const outRel = alias(relDir || '');
        const outPathKey = outRel ? `${outBasePrefix}/${outRel}` : outBasePrefix;
        const val = toPosix(idx.replace(path.resolve(process.cwd()) + path.sep, ''));
        entries[outPathKey] = val;
        // Also emit an explicit '/index' entry to satisfy tools/tests that resolve that path
        if (outRel) {
          entries[`${outPathKey}/index`] = val;
        }
      }
      const items = fs.readdirSync(curAbs, { withFileTypes: true });
      for (const it of items) {
        if (it.isDirectory()) {
          if (it.name === 'node_modules' || it.name.startsWith('.')) continue;
          walk(path.join(curAbs, it.name), rel ? `${rel}/${it.name}` : it.name);
        }
      }
    };
    walk(absBase);
  };

  // 1) Mocks — publish under dist/shared-ui/mocks (recursive per-file) and folder-level entries
  addDirDeep('src/mocks', 'shared-ui/mocks', extsAll);
  addFolderIndexEntries('src/mocks', 'shared-ui/mocks');
  // For compatibility with tests expecting dist/shared-ui/mocks/index.*
  entries['shared-ui/mocks/index'] = 'src/mocks/index.ts';

  // 2) Components — publish under dist/shared-ui/components/* (recursive per-file) and folder-level entries
  // Special alias: components/shared -> components/common
  const aliasComponents = (relDir: string) => {
    if (!relDir) return '';
    const parts = relDir.split('/');
    if (parts[0] === 'shared') parts[0] = 'common';
    return parts.join('/');
  };

  addDirDeep('src/components', 'shared-ui/components', extsAll);
  addFolderIndexEntries('src/components', 'shared-ui/components', aliasComponents);

  return entries;
}

export default defineConfig({
  entry: discoverEntries(),
  format: ['esm', 'cjs'],
  outExtension: ({ format }) => ({
    js: format === 'esm' ? '.mjs' : '.cjs',
  }),
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  external: ['react', 'react-dom', 'next'],
  target: 'es2019',
  treeshake: true,
});
