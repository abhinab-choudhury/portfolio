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

## Automatic GitHub contributions

The `Sync GitHub contributions` GitHub Actions workflow imports public authored PRs
into the existing Sanity `openSource` collection hourly. The website reads this
content at runtime and refreshes it every minute; no per-PR deployment is needed.
New records automatically appear only when merged, not drafts, and contributed to
repositories owned by someone else. Open/closed/own-repository PRs are imported but
hidden by default so you can optionally show them.

### One-time activation

1. In this GitHub repository's **Settings → Secrets and variables → Actions**, add:
   - Secret `SANITY_WRITE_TOKEN`: a Sanity API token with Editor access to the target dataset.
   - Variable `SANITY_PROJECT_ID`: the same project ID used by the website.
   - Variable `SANITY_DATASET`: the same dataset used by the website (defaults to `production`).
   - Optional variable `CONTRIBUTIONS_GITHUB_USERNAME`: your GitHub login (defaults to the repository owner).
2. Merge the workflow into the default branch and deploy the web app and Studio once.
3. Under **Actions → Sync GitHub contributions**, choose **Run workflow** for the initial import.
   Later runs use GitHub's built-in token; no personal GitHub token is required.

In Studio, **Show** is the master switch. **Visibility override** can force a public
PR to show or hide; Automatic uses the rules above. **Pin to top** sorts a contribution
first within the existing organization/project grouping and adds a Featured label.
Publish your edits for them to appear. Sync preserves your title, description,
visibility and pin choices. `Latest GitHub title` holds the upstream title separately.
Existing manually entered contributions retain their visibility and are matched by
exact PR URL on import. Draft-only matches are updated without being published.

The sync reads every page before writing. An API failure leaves existing content
available and fails the workflow for investigation. Successfully imported records
that disappear from the public GitHub results are hidden on the next successful
sync (even with Always show); their old metadata remains in Sanity. Use a dataset
appropriate for public portfolio content. Schedules may be delayed by GitHub, and
scheduled workflows in inactive public repositories can be disabled by GitHub.
Sanity CDN caching can add a short delay. Avoid running concurrent manual copies of
the sync; workflow runs are serialized to prevent duplicate imports.

Run the dependency-free sync tests with:

```sh
node --test scripts/sync-contributions.test.mjs
```

API references: [GitHub pagination](https://docs.github.com/en/graphql/guides/using-pagination-in-the-graphql-api)
and [Sanity mutations](https://www.sanity.io/docs/http-reference/mutation).
