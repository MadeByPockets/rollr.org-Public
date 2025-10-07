# @pockets/shared-ui

A shareable UI library of React/Next components and supporting code (components, mocks, etc.). This package is published as a tarball attached to a GitHub Release and can be installed directly from the release URL.

## How to publish a new release

Prerequisites:
- GitHub CLI installed and authenticated (`gh auth status`).
- Clean working tree (no uncommitted changes).
- Node.js 20+.

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
- react ^18
- react-dom ^18
- next ^14 || ^15

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
