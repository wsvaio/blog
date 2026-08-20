# AGENTS.md

Personal blog built with **Nuxt 4** (frontend + Nitro backend), **Drizzle ORM** (PostgreSQL), **UnoCSS**, and **Pinia**. Uses **oxlint/oxfmt** (not ESLint/Prettier) and **valibot** (not Zod) for validation.

## Quick Commands

| Task | Command |
|------|---------|
| Dev server | `pnpm dev` |
| Build | `pnpm build` |
| Preview prod build | `pnpm preview` |
| Lint | `pnpm lint` / `pnpm lint:fix` |
| Format | `pnpm fmt` / `pnpm fmt:check` |
| Generate migration | `pnpm db:generate` |
| Run migration | `pnpm db:migrate` |
| Push schema directly | `pnpm db:push` |
| Seed DB | `npx tsx server/db/seed.ts` |
| Hash a password | `pnpm hash-password <password>` |

Package manager: **pnpm**. No test framework is configured.

## Architecture

Nuxt 4 `app/` directory layout — frontend code lives under `app/`, server code under `server/`.

- `app/pages/` — File-based routing. Public pages (`index/`, `about/`, `article/`, `type/`) and admin pages (`admin/`).
- `app/layouts/default/` — Public site layout. `app/layouts/admin/` — Admin dashboard layout.
- `app/components/` — Organized by domain: `article/`, `comment/`, `layout/`, `markdown/`, `ui/` (reusable primitives), `widget/`.
- `app/stores/` — Pinia stores, auto-imported. `useUserStore` manages JWT token (persisted to localStorage).
- `app/composables/` — Auto-imported. `useMessage` (toast), `useRequestMy` (async wrapper).
- `app/plugins/` — All `.client.ts`. `api-error.client.ts` is critical: overrides global `$fetch` to auto-inject `Authorization: Bearer <token>`.
- `server/api/` — Nitro file-based API routes.
- `server/db/` — Drizzle schema (`schema.ts`), relations (`relations.ts`), connection (`index.ts`).
- `shared/` — Currently empty (Nuxt 4 shared directory).
- `trash/` — Legacy code from Prisma→Drizzle migration. Ignore.

### Database (Drizzle ORM)

PostgreSQL via `pg` driver. Schema in `server/db/schema.ts`.

- Uses **Drizzle 1.0 beta** API — relations defined via `defineRelations()` with `r.one()` / `r.many()` syntax (not the old `relations()` + `one()`/`many()` API).
- Tables: `article` (soft delete), `type`, `tag`, `article_to_tag` (M2M join), `article_stats` (1:1), `event` (analytics), `comment` (nested with parent/reply self-references), `user` (soft delete), `file`.
- Helpers: `primaryId()` = `serial().primaryKey()`, `timestamps()` = `{ created_at, updated_at, deleted_at }`.
- All DB column names are snake_case (explicitly mapped via `text("column_name")`).
- Query with `db.query.<table>.findFirst/findMany` (relational API); mutations via `db.insert/update/delete`.

## API Route Conventions

Every `server/api/*.ts` follows this pattern:

1. **Validation** — Define a valibot schema (`v.object()`, `v.pipe()`, etc.).
2. **OpenAPI metadata** — `defineRouteMeta({ openAPI: { tags, summary, security, ... } })`.
3. **Handler** — `export default defineEventHandler(async (event) => { ... })`.
4. Parse input: `getValidatedQuery()` / `getQuery()` + `v.parse()` for query params; `readBody()` for body.
5. DB access via `db.query.*` or `db.insert/update/delete`.
6. Errors: `throw createError({ statusCode, message })` — error messages are in **Chinese**.
7. Return raw data directly — no `{ code, data, message }` envelope.
8. Server auto-imports: `db`, `defineEventHandler`, `createError`, `getQuery`, `readBody`, etc. — no explicit import needed. Schema entities and utils imported via `~~/server/...`.

### Auth

- **JWT** via `jose` (HS256). Secret: `NUXT_JWT_SECRET` runtime config.
- `server/middleware/auth.ts` applies to all `/api/*` routes: GET requests and whitelisted routes (login, mcp, comment POST, user upsert) are public; all others require a valid Bearer token and set `event.context.user`.
- Password hashing: Node `scryptSync`, format `salt:hash` (base64url). See `server/utils/password.ts`.

## Other Important Details

- **Environment variables**: `DATABASE_URL`, `NUXT_JWT_SECRET`, `EMAIL_PASS` (see `env.d.ts`, `nuxt.config.ts`, `drizzle.config.ts`).
- **Docker**: `docker-compose.yaml` runs PostgreSQL 18.4 and Redis 7.0. The `docker-compose.yaml` has hardcoded dev credentials.
- **MCP server**: `server/api/mcp.get.ts` + `server/api/mcp.post.ts` expose a Model Context Protocol JSON-RPC endpoint at `/api/mcp` with tools to list and call API routes via the auto-generated OpenAPI schema.
- **File uploads**: `server/api/upload.post.ts` — 5MB image limit, writes to `./public/uploads`, metadata in `file` table.
- **Styling**: UnoCSS (`presetUno`, `presetAttributify`, `presetIcons`, `presetWebFonts`) + Less. Dark mode via `class` strategy.
- **No response wrapper on APIs**: The `$fetch` plugin (`app/plugins/api-error.client.ts`) auto-injects the JWT token on every request and surfaces errors via `useMessage` toasts.
- **Nitro openAPI**: Auto-generated at `/_openapi.json` (enabled in `nuxt.config.ts`).

## Agent skills

### Issue tracker

Issues are tracked in GitHub Issues for `wsvaio/blog`. See `docs/agents/issue-tracker.md`.

### Triage labels

Triage uses the five canonical labels with their default names. See `docs/agents/triage-labels.md`.

### Domain docs

Domain documentation uses a single-context layout. See `docs/agents/domain.md`.
