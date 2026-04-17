# Mastodon migration — apply when Agent mode is on

Your Cursor session is in **Plan mode**, which blocks edits to non-markdown files. The Supabase SQL below was already applied to project `eotdlqjubhgpbjjpfsem` via MCP. Switch to **Agent mode** and ask to "apply Mastodon migration from docs/MASTODON_MIGRATION_APPLY.md" to have the assistant create the JS files, or copy the sections manually.

## What you need from Mastodon (no paid API)

You do **not** need a developer account or API keys from Mastodon Inc.

1. **Create a normal user** on any instance (e.g. [mastodon.social](https://mastodon.social/auth/sign_up)).
2. In PromoPilot **Settings**, enter that instance hostname (e.g. `mastodon.social`) and click **Connect** — the app registers itself on that instance and runs OAuth.
3. In **Vercel**, add only this extra variable for Mastodon (besides your existing 3 Supabase vars):

| Key | Value |
|-----|--------|
| `MASTODON_CALLBACK_URL` | `https://promo-pilot-five.vercel.app/api/mastodon/oauth-callback` |

4. Optional for scheduled posts (same as before Twitter removal):

| Key | Value |
|-----|--------|
| `CRON_SECRET` | Random string; use `Authorization: Bearer <value>` on cron-job.org |

## Supabase SQL (if not already applied)

```sql
alter table platform_connections add column if not exists platform_base_url text;

create table if not exists mastodon_instance_apps (
  instance_host text primary key,
  client_id text not null,
  client_secret text not null,
  redirect_uri text not null,
  created_at timestamptz default now()
);

alter table mastodon_instance_apps enable row level security;
```

## Files to add/remove (summary)

**Add**

- `api/_lib/mastodon.js` — normalize instance, register app, token exchange, verify credentials, `publishMastodonPost(supabase, post)`
- `api/mastodon/oauth-start.js` — `user_id`, `instance` query params; pending row `platform_name = '_mastodon_oauth_pending'`; `platform_base_url`; `refresh_token` = OAuth `state`
- `api/mastodon/oauth-callback.js` — match pending by `state`; exchange code; insert `platform_name = 'mastodon'`
- `api/mastodon/publish.js` — POST `{ postId, userId }` for immediate publish
- `src/services/platforms/index.js` — `buildMastodonOAuthStartUrl`, `publishApiPath('mastodon')`, `DEFAULT_CHAR_LIMITS`
- `src/services/platforms/mastodon.js` — thin re-exports / helpers

**Remove**

- `api/twitter/oauth-start.js`
- `api/twitter/oauth-callback.js`
- `api/twitter/publish.js`

**Edit**

- `api/cron/publish-scheduled.js` — replace Twitter branch with `publishMastodonPost` from `api/_lib/mastodon.js` when `post.platform === 'mastodon'`
- `src/pages/CreatePost.jsx` — default platform `mastodon`, limit 500 chars, `fetch('/api/mastodon/publish', ...)`
- `src/pages/Settings.jsx` — Mastodon row + instance `Input`, connect URL with `instance` param; generic platform names in UI
- `src/App.js` — query params `platform_connected` / `platform_error` instead of `twitter_*`
- `src/pages/Dashboard.jsx`, `ScheduledPosts.jsx` — icon map key `mastodon` (e.g. `Mastodon` icon from lucide or `MessageCircle`)
- `.env.example`, `SETUP.md`, `README.md` — Mastodon + `MASTODON_CALLBACK_URL`, remove Twitter

## OAuth redirect query (frontend)

After callback, redirect to `/?platform_connected=mastodon` or `/?platform_error=...` and let `App.js` show a banner and open Settings.

---

When Agent mode is enabled, say: **Implement Mastodon per docs/MASTODON_MIGRATION_APPLY.md** and the assistant can write all files in one pass.
