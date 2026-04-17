import { createClient } from '@supabase/supabase-js';
import {
  normalizeMastodonInstance,
  exchangeMastodonAuthorizationCode,
  fetchMastodonAccount,
} from '../_lib/mastodon';

export default async function handler(req, res) {
  const { MASTODON_CALLBACK_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;

  if (!MASTODON_CALLBACK_URL || !SUPABASE_SERVICE_ROLE_KEY || !supabaseUrl) {
    return res.redirect('/?platform_error=mastodon_missing_config');
  }

  const { code, state, error: oauthErr } = req.query;
  if (oauthErr || !code || !state) {
    return res.redirect('/?platform_error=' + encodeURIComponent(oauthErr || 'mastodon_missing_params'));
  }

  const supabase = createClient(supabaseUrl, SUPABASE_SERVICE_ROLE_KEY);

  const { data: pendingRows, error: findError } = await supabase
    .from('platform_connections')
    .select('*')
    .eq('platform_name', '_mastodon_oauth_pending')
    .eq('refresh_token', String(state))
    .eq('connection_status', 'pending');

  if (findError || !pendingRows?.length) {
    return res.redirect('/?platform_error=mastodon_invalid_state');
  }

  const pending = pendingRows[0];
  const userId = pending.user_id;
  const baseUrl = (pending.platform_base_url || '').replace(/\/$/, '');
  const hostNorm = normalizeMastodonInstance(baseUrl.replace(/^https:\/\//, ''));
  if (hostNorm.error) {
    return res.redirect('/?platform_error=mastodon_bad_instance');
  }
  const host = hostNorm.host;

  await supabase.from('platform_connections').delete().eq('id', pending.id);

  const { data: appRow, error: appErr } = await supabase
    .from('mastodon_instance_apps')
    .select('client_id, client_secret')
    .eq('instance_host', host)
    .single();

  if (appErr || !appRow) {
    return res.redirect('/?platform_error=mastodon_app_not_found');
  }

  let tokenJson;
  try {
    tokenJson = await exchangeMastodonAuthorizationCode(
      baseUrl,
      appRow.client_id,
      appRow.client_secret,
      String(code),
      MASTODON_CALLBACK_URL
    );
  } catch (e) {
    console.error('Mastodon token exchange:', e);
    return res.redirect('/?platform_error=mastodon_token_exchange_failed');
  }

  const account = await fetchMastodonAccount(baseUrl, tokenJson.access_token);

  await supabase.from('platform_connections').delete().eq('user_id', userId).eq('platform_name', 'mastodon');

  const expiresAt = tokenJson.expires_in
    ? new Date(Date.now() + Number(tokenJson.expires_in) * 1000).toISOString()
    : null;

  const { error: insertError } = await supabase.from('platform_connections').insert([
    {
      user_id: userId,
      platform_name: 'mastodon',
      platform_base_url: baseUrl,
      platform_user_id: account.id,
      platform_username: account.username,
      access_token: tokenJson.access_token,
      refresh_token: tokenJson.refresh_token || null,
      token_expires_at: expiresAt,
      connection_status: 'connected',
    },
  ]);

  if (insertError) {
    console.error(insertError);
    return res.redirect('/?platform_error=mastodon_store_failed');
  }

  return res.redirect('/?platform_connected=mastodon');
}
