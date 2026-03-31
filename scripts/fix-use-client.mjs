import fs from "node:fs";
import path from "node:path";

const DIST_DIR = path.resolve(process.cwd(), "dist");

function walk(dir, cb) {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
        const full = path.join(dir, item.name);
        if (item.isDirectory()) {
            walk(full, cb);
        } else if (item.isFile() && /\.(m?js|c?js)$/.test(item.name)) {
            cb(full);
        }
    }
}

if (fs.existsSync(DIST_DIR)) {
    let fixed = 0;
    walk(DIST_DIR, (file) => {
        const content = fs.readFileSync(file, "utf8");
        // Only add "use client" if it's not already there and the file seems to need it
        // Or for this UI library, we can safely add it to all component-related bundles
        if (!content.startsWith('"use client"') && !content.startsWith("'use client'")) {
            // Check if it's a component bundle or index
            // Mocks and types probably don't need it, but it doesn't hurt much if we're careful.
            // Let's be targeted: components, public entries, common
            const rel = path.relative(DIST_DIR, file);
            const isType = rel.includes("types");
            const isMock = rel.includes("mocks");

            if (!isType && !isMock) {
                fs.writeFileSync(file, `"use client";\n${content}`, "utf8");
                fixed++;
            }
        }
    });
    console.log(`[fix-use-client] Added "use client" to ${fixed} file(s).`);
}
