# Scheduled posts — cron setup

The endpoint `GET /api/cron/publish-scheduled` publishes due posts. It requires:

`Authorization: Bearer <CRON_SECRET>`

where `<CRON_SECRET>` matches the `CRON_SECRET` environment variable in Vercel (and in `.env.local` for `vercel dev`).

## Vercel

1. Project → Settings → Environment Variables → add `CRON_SECRET` (any long random string; `openssl rand -hex 32` is fine).
2. Redeploy.

## cron-job.org (Hobby-friendly)

1. Create a job: URL `https://promo-pilot-five.vercel.app/api/cron/publish-scheduled`.
2. Schedule: every 1–5 minutes.
3. Add header: `Authorization` = `Bearer ` + your exact `CRON_SECRET` (no quotes).

Until Mastodon publishing is implemented in `api/cron/publish-scheduled.js`, this endpoint may only handle supported platforms.
