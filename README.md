# Marketplace Booking Platform

Booksy-inspired marketplace and business operations foundation built with Next.js, Supabase, and Vercel.

## What is included

- public marketplace shell
- business profile and booking flow shell
- business dashboard shell
- Supabase-ready repository and service layers
- SQL migrations with multi-tenant tables and RLS
- placeholder payment abstraction
- seed data for discovery pages

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn-style UI primitives
- Supabase Auth + Postgres + Storage + Realtime
- Vercel deployment target

## Project structure

- `src/app` - App Router pages and route handlers
- `src/components` - UI primitives and feature components
- `src/lib` - env, repositories, domain logic, services, Supabase clients
- `supabase/migrations` - schema and RLS
- `supabase/seed.sql` - demo data
- `docs/architecture.md` - system and MVP plan

## Local setup

1. Install Node.js 20.9+.
2. Install dependencies:

```bash
npm install
```

3. Copy env values:

```bash
cp .env.example .env.local
```

PowerShell:

```powershell
Copy-Item .env.example .env.local
```

4. Fill in your Supabase project keys.
5. Start the app:

```bash
npm run dev
```

## Supabase setup

1. Create a new Supabase project.
2. Run the migration in `supabase/migrations/202604022315_init.sql`.
3. Run the seed in `supabase/seed.sql`.
4. Enable email auth in Supabase Auth.
5. Add the app URL and local dev URL to allowed redirect URLs.

## Vercel deployment

1. Import the repository into Vercel.
2. Set the environment variables from `.env.example`.
3. Use the default Next.js framework preset.
4. Redeploy after every schema or auth configuration change.

## Current MVP status

Implemented now:

- landing and discovery pages
- business profile page
- booking form with placeholder API call
- dashboard overview, bookings, services, clients
- admin shell
- domain booking policy test
- Supabase schema and RLS foundation

Still TODO for full MVP:

- real auth screens and session handling
- tenant-aware Supabase queries in repositories
- slot generation engine
- real booking persistence with clients and services
- notification delivery providers
- payment provider adapter

## Notes

- The app falls back to demo data when Supabase env vars are missing.
- Payment flows are intentionally abstracted but not integrated with a processor yet.
- The schema is designed as a strong starting point, not as the final production data model.
