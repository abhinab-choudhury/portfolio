# Agent Setup Guide

This guide is written for AI coding agents (or any developer) who need to get this
project running quickly and understand how it is structured. Follow the steps in
order — they are intentionally ordered so that setup succeeds with minimal guesswork.

## 1. What this project is

A personal portfolio website monorepo. It contains two runnable apps and one
shared package:

```
.
├── apps/
│   ├── web/       # Public portfolio site (React + Vite + Tailwind, reads from Sanity)
│   └── studio/    # Sanity content studio (CMS for editing site content)
├── packages/
│   └── typescript-config/   # Shared TS config presets (@repo/typescript-config)
├── pnpm-workspace.yaml      # Registers apps/* and packages/* as workspaces
├── turbo.json               # Task orchestration (build, dev, lint, typegen, deploy)
└── package.json             # Root scripts + pinned packageManager pnpm@9.0.0
```

## 2. Toolchain requirements

- **Node.js >= 18** (root `engines`), verified against the pinned `packageManager`.
- **pnpm 9.x** — the repo is pinned to `pnpm@9.0.0`. Using a different major may
  break the install. If you only have Corepack-free pnpm, install with:
  `npm i -g pnpm@9.0.0`.

Do **not** use `npm` or `yarn` to install; this workspace uses pnpm workspaces
and Turbo (the lockfile is `pnpm-lock.yaml`).

## 3. Install dependencies

From the repo root:

```bash
pnpm install
```

This reads `pnpm-workspace.yaml`, resolves `packages/*` and `apps/*`, and links
the local `@repo/typescript-config` workspace package.

## 4. Configure environment variables

The code reads Sanity credentials from `import.meta.env` / `process.env`, never
from hardcoded values. Create the `.env` files from the examples:

**Web app** (`apps/web/.env`):

```
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
```

These are consumed in `apps/web/src/lib/sanity.ts`. The `VITE_` prefix matters —
Vite only exposes `VITE_`-prefixed vars to the client.

**Studio** (`apps/studio/.env`):

```
SANITY_STUDIO_PROJECT_ID=""
SANITY_STUDIO_DATASET="production"
SANITY_PROJECT_ID=""
SANITY_DATASET="production"
```

- `SANITY_STUDIO_*` are read by `apps/studio/sanity.config.ts`
  (`import.meta.env`).
- `SANITY_PROJECT_ID` / `SANITY_DATASET` (no `STUDIO` infix) are read by the
  Sanity CLI in `apps/studio/sanity.cli.ts` (`process.env`). Both are needed for
  commands like `pnpm studio:deploy` and `pnpm typegen`.

Without a valid Sanity project ID the studio will fail to load, and the web app
will render no content (it fetches everything from Sanity). For local UI work
without backend data, any placeholder project id will let the app boot.

## 5. Run the dev servers

```bash
pnpm dev          # both web + studio via Turbo
pnpm web          # web only
pnpm studio       # studio only
```

Expected ports: Vite web app on `http://localhost:5173`, Sanity studio on
`http://localhost:3333`. `dev` tasks are configured as `persistent: true` and
uncached in `turbo.json`, so assume they keep running.

## 6. Verify the setup

Run these from the repo root and expect all to pass before changing code:

```bash
pnpm check-types   # runs `tsc -b --noEmit` / `tsc --noEmit` per workspace
pnpm lint          # oxlint per workspace
pnpm build         # full production build (web: tsc -b && vite build)
```

## 7. Key commands & workflows

| Command              | What it does                                                        |
| -------------------- | ------------------------------------------------------------------- |
| `pnpm dev`           | Start all dev servers (uncached, persistent)                        |
| `pnpm build`         | Build every workspace                                               |
| `pnpm lint`          | Lint every workspace (oxlint)                                       |
| `pnpm check-types`   | Type-check every workspace                                          |
| `pnpm typegen`       | Sanity schema extract + typegen → writes `apps/web/sanity.types.ts` |
| `pnpm format`        | Prettier write on `**/*.{ts,tsx,md}`                                |
| `pnpm studio:deploy` | `sanity deploy` for the studio (depends on build, uncached)         |
| `pnpm web:build`     | Build only the web app                                              |

Notes:

- `pnpm typegen` is the CD step: from the studio it extracts `schema.json`,
  scans `apps/web/src/**/*.{ts,tsx}`, and regenerates `apps/web/sanity.types.ts`.
  Run it after editing Sanity schemas.
- Filter syntax comes from Turbo (`--filter=web`, `--filter=studio`); `--filter`
  matches the workspace `name`, not the directory.

## 8. Conventions an agent should follow

- **Package manager:** always use `pnpm`. Never commit `.env` files (gitignored).
- **Code style:** Prettier config lives in the studio `package.json` (no spaces,
  printWidth 100, no semicolons, single quotes). Run `pnpm format` before finishing.
- **Linting:** oxlint with React + TypeScript + import plugins
  (`.oxlintrc.json`, `apps/web/.oxlintrc.json`). No ESLint in this repo.
- **Toolchain pins:** pnpm 9.0.0, TypeScript per-workspace (`web` uses ~6.0.2,
  `studio` uses ^5.8), React 19, Turbo 2. Do not bump these without a reason.
- **Shared config:** never duplicate TS configs; extend
  `packages/typescript-config/*.json` via `@repo/typescript-config`.
- **Caching:** Turbo caches build/lint/type-check outputs (excluding `dev` and
  `typegen`). If a cached run looks stale, the `.turbo` cache dir can be deleted
  (see `.gitignore`).

## 9. Common failure points

- **Wrong package manager:** installing with `npm` produces a different lockfile
  and breaks workspace resolution. Reinstall with `pnpm`.
- **Missing `.env`:** studio fails to boot or web renders empty. Always copy the
  `.env.example` files first.
- **`SANITY_PROJECT_ID` vs `SANITY_STUDIO_PROJECT_ID`:** these are distinct and
  both required — used by the CLI and the studio config respectively.
- **Wrong pnpm version:** pnpm 8 or 10 may error on workspace resolution /
  engine checks. Stick to the pinned `pnpm@9.0.0`.
- **Node version:** Node < 18 fails the `engines` check. Use 18+.

## 10. When is setup complete?

- `pnpm install` succeeds with no peer/worktree errors.
- Both `.env` files exist (copied from `.env.example`).
- `pnpm check-types`, `pnpm lint`, and `pnpm build` all exit 0.
- `pnpm dev` boots the web app and the studio without crashing.


## 11. Sanity AI Agent & Studio Modification Setup

This repository supports both **Sanity Context (MCP)** for data/schema reads and **Sanity Agent Skills** to let external AI coding tools safely create, modify, and manage your local Sanity Studio configuration files and schemas.

### 1. Modifying Sanity Studio via AI Coding Tools (Agent Skills)

To prevent AI coding assistants from writing broken schema layouts or outdated configurations, you can provision **Sanity Agent Skills** inside this workspace. This toolkit passes explicit framework capabilities directly to tools like Cursor or Claude Code.

To bootstrap the local agent capabilities, run the following setup command from the workspace root:

```bash
pnpm install --save-dev -w @sanity/agent-toolkit
```

This installs portable instructions that tell your AI agent exactly how to:
* **Add new Schema Types:** Correctly declare objects and documents in compliance with Sanity Studio rules.
* **Configure Fields:** Inject strings, blocks, references, and slugs safely without formatting errors.
* **Integrate Plugins:** Correctly wire up visual editing or localization inside `sanity.config.ts`.

### 2. Reading Live Content and Database Schemas (MCP Server)

To allow external AI coding agents to communicate with your live content lake, you can expose your workspace via the **Model Context Protocol (MCP)**.

When properly configured, an AI agent interacting with this repo can:
* **Inspect Live Schemas:** Map out document types, fields, and references on your live dataset.
* **Execute GROQ Queries:** Run, test, and validate database queries locally inside your AI chat interface.

#### Configuring the MCP Client

Add the official Sanity MCP server configuration to your AI tool's global settings file (e.g., Cursor's `mcpServers` settings or Claude Code's config):

```json
{
  "mcpServers": {
    "sanity": {
      "command": "npx",
      "args": ["-y", "@sanity/mcp-server"],
      "env": {
        "SANITY_PROJECT_ID": "your_project_id",
        "SANITY_DATASET": "production",
        "SANITY_TOKEN": "your_write_or_read_token"
      }
    }
  }
}
```

*Note: For typical UI building, a read-only token is safest. If you want the agent to execute actions that directly mutate live content inside your studio using code commands, provision a token with `write` permissions.*

### Sample Prompts for the AI Agent
Once Agent Skills and MCP are live, you can prompt your AI editor with tasks like:
* *"Look at our live schema structure and add a new custom field for 'GitHub URL' to the author schema file, then format it."*
* *"Build a new strictly typed portfolio project card component using Tailwind that consumes our live project data structure."*



