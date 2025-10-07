# @pockets/shared-ui

A shareable UI library of React/Next components and supporting code (components, mocks, etc.). This package is published as a tarball attached to a GitHub Release and can be installed directly from the release URL.

## How to publish a new release

Prerequisites:
- EITHER: GitHub CLI installed and authenticated (`gh auth status`)
- OR: Set an environment token `GITHUB_TOKEN` (or `GH_TOKEN`) with repo scope
- Clean working tree (no uncommitted changes).
- Node.js 20+.

If you don't have gh installed, set a token and run locally:
- PowerShell (Windows):  $env:GITHUB_TOKEN = "<your-token>"
- bash/zsh (macOS/Linux): export GITHUB_TOKEN="<your-token>"

The release script will use gh when available; otherwise it will use the GitHub REST API with the token.

Local release:

- patch bump (default):
  npm run publish:web

- minor or major bump:
  node scripts/release.mjs minor
  node scripts/release.mjs major

The script will:
- Bump the version in package.json via `npm version <type>` (commit + tag)
- Build the package (`tsup`)
- Create a tarball via `npm pack`
- Push commit and tag
- Create a GitHub Release and upload the tarball asset

GitHub Action alternative:
- Use the Release workflow manually (workflow_dispatch) and pass input `bump` as `patch|minor|major`.

## How to consume

Install from a GitHub Release (replace <ORG>/<REPO> and version):

  npm i https://github.com/<ORG>/<REPO>/releases/download/vX.Y.Z/pockets-shared-ui-X.Y.Z.tgz

In your Next.js app’s next.config.mjs (or next.config.ts), add:

  import { defineConfig } from 'next/config';

  export default {
    experimental: {
      // Ensure the package is transpiled by Next
      transpilePackages: ["@pockets/shared-ui"],
    },
  };

Peer dependencies expected from the consuming app:
- react ^19
- react-dom ^19
- next ^15
- @mui/material ^7 (required if you use components that rely on MUI)
- @mui/icons-material ^7 (optional; only if you use components that render icons)
- @mui/joy ^5.0.0-beta (optional)
- @emotion/react ^11 and @emotion/styled ^11

### MUI version alignment note

If your app uses @mui/icons-material, ensure its minor version matches your installed @mui/material minor version. For example:
- If you have @mui/material@7.1.x, use @mui/icons-material@~7.1.0
- If you upgrade to @mui/material@7.3.x, then use @mui/icons-material@^7.3.0

NPM may otherwise attempt to install the latest @mui/icons-material (e.g., 7.3.x) which requires @mui/material^7.3.x and can cause ERESOLVE in projects pinned to @mui/material 7.1.x.

## Package entry points

This package ships ESM and CJS builds with type declarations. The main barrel is `src/index.ts` which re-exports from:
- components
- mocks
- data (placeholder)
- hooks (placeholder)
- utils (placeholder)

You can import like:

  import { SearchPageLayout, Tags, Players } from "@pockets/shared-ui";

Or deep-import specific modules if desired (paths are preserved in the build).
