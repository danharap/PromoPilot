import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { normalizeMastodonInstance, getOrCreateMastodonApp } from '../_lib/mastodon';

export default async function handler(req, res) {
  const { MASTODON_CALLBACK_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;

  if (!MASTODON_CALLBACK_URL || !SUPABASE_SERVICE_ROLE_KEY || !supabaseUrl) {
    return res.status(500).json({ error: 'Missing MASTODON_CALLBACK_URL or Supabase server configuration.' });
  }

  const userId = req.query.user_id;
  const instanceRaw = req.query.instance;
  if (!userId || !instanceRaw) {
    return res.status(400).json({ error: 'user_id and instance query params are required.' });
  }

  const normalized = normalizeMastodonInstance(instanceRaw);
  if (normalized.error) {
    return res.status(400).json({ error: normalized.error });
  }

  const { host, baseUrl } = normalized;
  const supabase = createClient(supabaseUrl, SUPABASE_SERVICE_ROLE_KEY);

  await supabase
    .from('platform_connections')
    .delete()
    .eq('user_id', userId)
    .eq('platform_name', '_mastodon_oauth_pending');

  let app;
  try {
    app = await getOrCreateMastodonApp(supabase, host, MASTODON_CALLBACK_URL);
  } catch (e) {
    return res.status(502).json({ error: e.message || 'Mastodon app registration failed' });
  }

  const state = crypto.randomBytes(24).toString('hex');

  const { error: storeError } = await supabase.from('platform_connections').insert([
    {
      user_id: userId,
      platform_name: '_mastodon_oauth_pending',
      platform_base_url: baseUrl,
      access_token: '',
      refresh_token: state,
      connection_status: 'pending',
    },
  ]);

  if (storeError) {
    return res.status(500).json({ error: 'Failed to store OAuth state.' });
  }

  const params = new URLSearchParams({
    client_id: app.client_id,
    redirect_uri: MASTODON_CALLBACK_URL,
    response_type: 'code',
    scope: 'read write',
    state,
    force_login: 'true',
  });

  return res.redirect(`${baseUrl}/oauth/authorize?${params.toString()}`);
}
