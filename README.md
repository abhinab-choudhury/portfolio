# Portfolio Website

> Abhinab Choudhury

A personal portfolio website backed by a Sanity content studio. This is a pnpm + Turborepo monorepo.

## Stack

- **Monorepo:** [Turborepo](https://turborepo.com) + [pnpm workspaces](https://pnpm.io/workspaces)
- **Web app** (`apps/web`): React 19 + TypeScript + Vite + Tailwind CSS, powered by `@sanity/client`
- **Studio** (`apps/studio`): Sanity CMS content studio
- **Shared config** (`packages/typescript-config`): TypeScript presets used across the workspace

## Prerequisites

- **Node.js** >= 18
- **pnpm** >= 9 (this repo is pinned to `pnpm@9.0.0` in `package.json`)

## Getting Started

```bash
# 1. Install dependencies
pnpm install

# 2. Configure environment variables
cp apps/web/.env.example apps/web/.env        # Web client
cp apps/studio/.env.example apps/studio/.env  # Sanity studio

# 3. Run everything (web + studio)
pnpm dev
```

| Command             | Description                                        |
| ------------------- | -------------------------------------------------- |
| `pnpm dev`          | Run the web app and the studio dev servers         |
| `pnpm web`          | Run only the web app (`--filter=web`)              |
| `pnpm studio`       | Run only the studio (`--filter=studio`)            |
| `pnpm build`        | Build all workspaces                               |
| `pnpm lint`         | Lint all workspaces (oxlint)                       |
| `pnpm check-types`  | Type-check all workspaces                          |
| `pnpm typegen`      | Generate Sanity schema types (`sanity.types.ts`)   |
| `pnpm studio:deploy`| Deploy the Sanity studio                           |

The web app runs via Vite and the studio on the Sanity dev server (defaults: web on `http://localhost:5173`, studio on `http://localhost:3333`).

## Environment Variables

| File                  | Variable                     | Description                                  |
| --------------------- | ---------------------------- | -------------------------------------------- |
| `apps/web/.env`       | `VITE_SANITY_PROJECT_ID`     | Sanity project ID for the web client         |
| `apps/web/.env`       | `VITE_SANITY_DATASET`        | Sanity dataset (e.g. `production`)           |
| `apps/web/.env`       | `VITE_SANITY_API_VERSION`    | Sanity API version (e.g. `2024-01-01`)       |
| `apps/studio/.env`    | `SANITY_STUDIO_PROJECT_ID`   | Project ID used by the studio config         |
| `apps/studio/.env`    | `SANITY_STUDIO_DATASET`      | Dataset used by the studio config            |
| `apps/studio/.env`    | `SANITY_PROJECT_ID`          | Project ID used by the Sanity CLI            |
| `apps/studio/.env`    | `SANITY_DATASET`             | Dataset used by the Sanity CLI               |

All `.env` files are gitignored — never commit real values.

## Verifying Your Setup

```bash
pnpm install
pnpm check-types
pnpm lint
```

If all three pass and `pnpm dev` starts both servers, the project is ready to work on.

See [agent-setup.md](./agent-setup.md) for a detailed guide aimed at AI coding agents.
