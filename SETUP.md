# PromoPilot Setup Guide

## 1. Local Development

### Prerequisites
- Node.js 18+
- Vercel CLI: `npm i -g vercel`

### Install dependencies
```bash
npm install
```

### Create your local env file
```bash
cp .env.example .env.local
```

Fill in `.env.local`:

| Variable | Where to get it |
|----------|----------------|
| `REACT_APP_SUPABASE_URL` | Supabase → Project Settings → API |
| `REACT_APP_SUPABASE_ANON_KEY` | Supabase publishable or anon key |

For **`vercel dev`** (React + `api/` routes together), also set:

| Variable | Notes |
|----------|--------|
| `SUPABASE_SERVICE_ROLE_KEY` | Service role / secret key — server only |
| `MASTODON_CALLBACK_URL` | e.g. `http://localhost:3000/api/mastodon/oauth-callback` |
| `CRON_SECRET` | `openssl rand -hex 32` — same value as `Authorization: Bearer …` for cron |

### Run locally (with API routes)
```bash
vercel dev
```

> **`npm start`** only runs the CRA UI. Mastodon connect and cron need **`vercel dev`** locally.

---

## 2. Supabase

Apply SQL if needed (see [`supabase/migrations/20260418000000_mastodon.sql`](supabase/migrations/20260418000000_mastodon.sql)):

- `platform_connections.platform_base_url`
- `mastodon_instance_apps` (OAuth app id/secret per Mastodon instance; server-only access)

Core tables: `profiles`, `platform_connections`, `posts`, `campaigns`, `settings`, `analytics_snapshots`.

### Email confirmation (optional)
Supabase → Authentication → Providers → Email → disable “Confirm email” for easier local testing.

---

## 3. Mastodon (no central developer fee)

1. Create a normal account on any server (e.g. [mastodon.social](https://mastodon.social)).
2. In **Settings**, enter that server hostname (e.g. `mastodon.social`) and click **Connect**.
3. The app registers on that instance and completes OAuth; tokens are stored in Supabase.

**Vercel / production:** set `MASTODON_CALLBACK_URL` to:

`https://promo-pilot-five.vercel.app/api/mastodon/oauth-callback`

(exact match required for OAuth redirect)

---

## 4. Vercel environment variables

| Variable | Purpose |
|----------|---------|
| `REACT_APP_SUPABASE_URL` | Supabase project URL (browser + serverless) |
| `REACT_APP_SUPABASE_ANON_KEY` | Public Supabase key |
| `SUPABASE_SERVICE_ROLE_KEY` | Privileged key for `api/*` only |
| `MASTODON_CALLBACK_URL` | Full callback URL (see above) |
| `CRON_SECRET` | Protects `GET /api/cron/publish-scheduled` |

Redeploy after changing env vars.

---

## 5. Cron (scheduled Mastodon posts)

See [`docs/CRON_SETUP.md`](docs/CRON_SETUP.md).

The cron handler accepts **`Authorization: Bearer <CRON_SECRET>`** (header key is case-insensitive).

On **Vercel Hobby**, use [cron-job.org](https://cron-job.org) (or similar) to `GET` your `/api/cron/publish-scheduled` URL every 1–5 minutes with that header.

---

## 6. Post-deploy checklist

- [ ] Sign up / sign in shows **your** email in the header and Settings → Account
- [ ] Dashboard / Scheduled posts load (empty is OK)
- [ ] Settings → Mastodon → Connect completes and shows “Connected as @…”
- [ ] Create Post → Mastodon → Post Now publishes (after connect)
- [ ] Scheduled post appears as Scheduled; cron moves it to Published
- [ ] Log out returns to sign-in

---

## 7. If the UI looks “stuck” on an old demo

Hard-refresh the site (**Cmd+Shift+R**). `vercel.json` sets `Cache-Control: no-cache` on `index.html` so new deploys load the latest bundle after redeploy.
