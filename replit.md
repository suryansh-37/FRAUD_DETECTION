# CFAP — Crypto Fraud Attribution Platform

CFAP is a role-aware evidence workspace for tracing crypto fraud, coordinating VASP freeze requests, and preserving court-ready chain-of-custody records.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/cfap-platform/` — the deployable React + Vite frontend and product UI.
- `artifacts/api-server/` — shared Express server and Clerk production proxy.
- `artifacts/cfap-platform/src/App.tsx` — role-aware portal routes, seeded demo data, and Clerk route wiring.
- `artifacts/cfap-platform/src/index.css` — CFAP visual tokens, font imports, motion, and responsive layout rules.
- `artifacts/cfap-platform/public/logo.svg` — branded CFAP mark used by the app and Clerk screens.

## Architecture decisions

- The public home route remains accessible to signed-out visitors; authenticated users enter through the role-aware portal.
- Clerk owns browser auth/session transport; the frontend never stores or manually passes auth tokens.
- The six operating personas are modeled as distinct workspace modes so the UI can express different responsibilities instead of hiding everything behind one generic dashboard.
- The first build uses realistic in-browser seeded data and client state to make the frontend demonstrable before backend case APIs are connected.

## Product

CFAP connects complaint intake, blockchain tracing, explainable risk scoring, supervisor approval, VASP response workflows, national coordination, operations health, and audit certification in one calm evidence room. It includes dedicated experiences for investigating officers, supervisors, national admins, VASP compliance teams, platform admins, and auditors.

## User preferences

- Use the palette anchors `#8B9A6E`, `#F7F2EB`, `#EAE2D6`, and `#EEEEEE`.
- Keep the interface polished, warm, responsive, and motion-rich without looking like a generic AI-generated admin template.

## Gotchas

- Clerk’s `SignIn` and `SignUp` routes must retain the exact `/*?` wildcard paths for OAuth callbacks.
- The Clerk proxy middleware must stay mounted before Express body parsing and is intentionally a no-op in development.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
