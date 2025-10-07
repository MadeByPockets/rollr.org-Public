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

  // Helper to add all files in a dir with a specific extension
  const addDir = (srcDir: string, outPrefix: string, exts: string[]) => {
    const absDir = path.resolve(process.cwd(), srcDir);
    if (!fs.existsSync(absDir)) return;
    const files = fs.readdirSync(absDir, { withFileTypes: true });
    for (const dirent of files) {
      if (dirent.isFile()) {
        const ext = path.extname(dirent.name);
        if (!exts.includes(ext)) continue;
        const base = path.basename(dirent.name, ext);
        const key = `${outPrefix}/${base}`; // e.g., shared-ui/mocks/Events
        const val = path.join(srcDir, dirent.name).replace(/\\/g, '/');
        entries[key] = val;
      }
    }
  };

  // Mocks — publish under dist/shared-ui/mocks
  addDir('src/mocks', 'shared-ui/mocks', ['.ts', '.tsx']);

  // Define folders we want to collect and expose under subpaths
  const collected = [
    { srcDir: 'src/components/EventPage', outPrefix: 'shared-ui/components/EventPage', folderEntry: 'src/components/EventPage/index.ts' },
    { srcDir: 'src/components/shared', outPrefix: 'shared-ui/components/common', folderEntry: 'src/components/shared/index.ts' },
  ];

  for (const cfg of collected) {
    addDir(cfg.srcDir, cfg.outPrefix, ['.tsx', '.ts']);
    // Also expose a folder-level entry for named imports like @pkg/<subpath>
    entries[cfg.outPrefix] = cfg.folderEntry;
  }

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
