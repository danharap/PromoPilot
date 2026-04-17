export function normalizeMastodonInstance(raw) {
  if (!raw || typeof raw !== 'string') {
    return { error: 'Instance is required.' };
  }
  let s = raw.trim().toLowerCase();
  if (s.includes('@')) {
    const parts = s.split('@');
    s = parts[parts.length - 1];
  }
  s = s.replace(/^https?:\/\//, '').split('/')[0];
  if (!s || !/^[a-z0-9.-]+$/.test(s) || s.startsWith('.') || s.endsWith('.')) {
    return { error: 'Invalid instance hostname.' };
  }
  const host = s;
  const baseUrl = `https://${host}`;
  return { host, baseUrl };
}

export async function getOrCreateMastodonApp(supabase, host, redirectUri) {
  const { data: existing } = await supabase
    .from('mastodon_instance_apps')
    .select('client_id, client_secret, redirect_uri')
    .eq('instance_host', host)
    .maybeSingle();

  if (existing && existing.redirect_uri === redirectUri) {
    return { client_id: existing.client_id, client_secret: existing.client_secret };
  }

  const baseUrl = `https://${host}`;
  const appRes = await fetch(`${baseUrl}/api/v1/apps`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_name: 'PromoPilot',
      redirect_uris: redirectUri,
      scopes: 'read write',
      website: 'https://vercel.com',
    }),
  });

  const appJson = await appRes.json().catch(() => ({}));
  if (!appRes.ok || !appJson.client_id || !appJson.client_secret) {
    const msg = appJson.error || appJson.client_id || `HTTP ${appRes.status}`;
    throw new Error(`Mastodon app registration failed: ${msg}`);
  }

  const { error: upsertError } = await supabase.from('mastodon_instance_apps').upsert(
    {
      instance_host: host,
      client_id: appJson.client_id,
      client_secret: appJson.client_secret,
      redirect_uri: redirectUri,
    },
    { onConflict: 'instance_host' }
  );

  if (upsertError) {
    throw new Error(`Failed to store Mastodon app credentials: ${upsertError.message}`);
  }

  return { client_id: appJson.client_id, client_secret: appJson.client_secret };
}

export async function exchangeMastodonAuthorizationCode(baseUrl, clientId, clientSecret, code, redirectUri) {
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    scope: 'read write',
  });

  const tokenRes = await fetch(`${baseUrl}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  const tokenJson = await tokenRes.json().catch(() => ({}));
  if (!tokenRes.ok || !tokenJson.access_token) {
    const msg = tokenJson.error_description || tokenJson.error || `HTTP ${tokenRes.status}`;
    throw new Error(`Token exchange failed: ${msg}`);
  }
  return tokenJson;
}

export async function fetchMastodonAccount(baseUrl, accessToken) {
  const res = await fetch(`${baseUrl}/api/v1/accounts/verify_credentials`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.id) {
    return { id: null, username: null };
  }
  return { id: String(data.id), username: data.username || null };
}

export async function publishMastodonPost(supabase, post) {
  const { data: connection, error: connError } = await supabase
    .from('platform_connections')
    .select('access_token, platform_base_url')
    .eq('user_id', post.user_id)
    .eq('platform_name', 'mastodon')
    .eq('connection_status', 'connected')
    .single();

  if (connError || !connection?.access_token || !connection?.platform_base_url) {
    await supabase
      .from('posts')
      .update({
        publish_status: 'failed',
        error_message: 'No connected Mastodon account.',
        updated_at: new Date().toISOString(),
      })
      .eq('id', post.id);
    return { status: 'failed', reason: 'No Mastodon connection' };
  }

  await supabase
    .from('posts')
    .update({ publish_status: 'publishing', updated_at: new Date().toISOString() })
    .eq('id', post.id);

  const baseUrl = connection.platform_base_url.replace(/\/$/, '');
  let statusRes;
  try {
    statusRes = await fetch(`${baseUrl}/api/v1/statuses`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${connection.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: post.content }),
    });
  } catch (err) {
    await supabase
      .from('posts')
      .update({
        publish_status: 'failed',
        error_message: err.message,
        updated_at: new Date().toISOString(),
      })
      .eq('id', post.id);
    return { status: 'failed', reason: err.message };
  }

  const statusJson = await statusRes.json().catch(() => ({}));
  if (!statusRes.ok || !statusJson.id) {
    const errMsg =
      statusJson.error ||
      statusJson.detail ||
      (Array.isArray(statusJson) && statusJson[0]?.error) ||
      `HTTP ${statusRes.status}`;
    await supabase
      .from('posts')
      .update({
        publish_status: 'failed',
        error_message: String(errMsg),
        updated_at: new Date().toISOString(),
      })
      .eq('id', post.id);
    return { status: 'failed', reason: String(errMsg) };
  }

  await supabase
    .from('posts')
    .update({
      publish_status: 'published',
      external_post_id: String(statusJson.id),
      published_at: new Date().toISOString(),
      error_message: null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', post.id);

  return { status: 'published', statusId: String(statusJson.id) };
}
