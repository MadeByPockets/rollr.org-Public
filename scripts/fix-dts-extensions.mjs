import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = 'dist';

function walk(dir, callback) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const it of items) {
    const full = path.join(dir, it.name);
    if (it.isDirectory()) {
      walk(full, callback);
    } else if (it.isFile()) {
      callback(full);
    }
  }
}

function fixDtsExtensions() {
  const absDist = path.resolve(process.cwd(), DIST_DIR);
  if (!fs.existsSync(absDist)) {
    console.error(`[fix-dts] ${DIST_DIR} not found.`);
    return;
  }

  let count = 0;
  walk(absDist, (file) => {
    if (file.endsWith('.d.ts') || file.endsWith('.d.cts')) {
      const content = fs.readFileSync(file, 'utf8');
      // Replace imports/exports with .js or .cjs extensions in relative paths
      // This should handle both './foo.js' and '../foo.js' but not 'foo.js' (package names)
      const fixed = content.replace(
        /(from\s+['"])(\.\.?\/[^'"]+)\.(js|cjs)(['"])/g,
        '$1$2$4'
      );

      if (fixed !== content) {
        fs.writeFileSync(file, fixed, 'utf8');
        count++;
      }
    }
  });

  console.log(`[fix-dts] Fixed extensions in ${count} declaration file(s).`);
}

fixDtsExtensions();
