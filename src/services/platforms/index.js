/**
 * Platform integration helpers (URLs only — no secrets in the browser).
 */

export function buildMastodonOAuthStartUrl(userId, instanceHost) {
  const q = new URLSearchParams({
    user_id: userId,
    instance: (instanceHost || '').trim(),
  });
  return `/api/mastodon/oauth-start?${q.toString()}`;
}

export const MASTODON_PUBLISH_PATH = '/api/mastodon/publish';

export const PLATFORM_IDS = {
  mastodon: 'mastodon',
  instagram: 'instagram',
  tiktok: 'tiktok',
  reddit: 'reddit',
};
