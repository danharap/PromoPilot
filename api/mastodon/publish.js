import { createClient } from '@supabase/supabase-js';
import { publishMastodonPost } from '../_lib/mastodon';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { SUPABASE_SERVICE_ROLE_KEY } = process.env;
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;

  if (!SUPABASE_SERVICE_ROLE_KEY || !supabaseUrl) {
    return res.status(500).json({ error: 'Missing server configuration.' });
  }

  const { postId, userId } = req.body || {};
  if (!postId || !userId) {
    return res.status(400).json({ error: 'postId and userId are required.' });
  }

  const supabase = createClient(supabaseUrl, SUPABASE_SERVICE_ROLE_KEY);

  const { data: post, error: postError } = await supabase
    .from('posts')
    .select('*')
    .eq('id', postId)
    .eq('user_id', userId)
    .single();

  if (postError || !post) {
    return res.status(404).json({ error: 'Post not found.' });
  }

  if (post.platform !== 'mastodon') {
    return res.status(400).json({ error: 'This endpoint only handles Mastodon posts.' });
  }

  const result = await publishMastodonPost(supabase, post);
  if (result.status === 'failed') {
    return res.status(502).json({ error: result.reason || 'Publish failed' });
  }

  return res.status(200).json({ success: true, statusId: result.statusId });
}
