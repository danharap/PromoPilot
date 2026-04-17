import { createClient } from '@supabase/supabase-js';
import { publishMastodonPost } from '../_lib/mastodon';

/**
 * GET /api/cron/publish-scheduled
 * Secured with Authorization: Bearer CRON_SECRET (case-insensitive header key).
 * Publishes due scheduled posts (Mastodon).
 */
function getBearer(req) {
  const raw =
    req.headers.authorization ||
    req.headers.Authorization ||
    req.headers['x-authorization'] ||
    '';
  const m = typeof raw === 'string' && raw.match(/^Bearer\s+(.+)$/i);
  return m ? m[1].trim() : '';
}

export default async function handler(req, res) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return res.status(500).json({ error: 'CRON_SECRET not configured.' });
  }

  const token = getBearer(req);
  if (token !== cronSecret) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }

  const { SUPABASE_SERVICE_ROLE_KEY } = process.env;
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;

  if (!SUPABASE_SERVICE_ROLE_KEY || !supabaseUrl) {
    return res.status(500).json({ error: 'Missing Supabase configuration.' });
  }

  const supabase = createClient(supabaseUrl, SUPABASE_SERVICE_ROLE_KEY);

  const { data: duePosts, error: queryError } = await supabase
    .from('posts')
    .select('*')
    .eq('publish_status', 'scheduled')
    .lte('scheduled_for', new Date().toISOString())
    .limit(50);

  if (queryError) {
    return res.status(500).json({ error: 'Failed to query due posts.', detail: queryError.message });
  }

  if (!duePosts?.length) {
    return res.status(200).json({ processed: 0, message: 'No posts due.' });
  }

  const results = [];
  for (const post of duePosts) {
    try {
      if (post.platform === 'mastodon') {
        const r = await publishMastodonPost(supabase, post);
        results.push({ postId: post.id, ...r });
      } else {
        results.push({
          postId: post.id,
          status: 'skipped',
          reason: `Platform '${post.platform}' is not supported by the scheduler yet`,
        });
      }
    } catch (err) {
      results.push({ postId: post.id, status: 'error', reason: err.message });
    }
  }

  return res.status(200).json({ processed: duePosts.length, results });
}
