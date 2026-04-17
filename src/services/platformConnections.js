import { supabase } from '../lib/supabase';

export async function getConnections(userId) {
  const { data, error } = await supabase
    .from('platform_connections')
    .select('id, platform_name, platform_username, platform_user_id, platform_base_url, connection_status, created_at')
    .eq('user_id', userId)
    .eq('connection_status', 'connected');

  if (error) throw error;
  return data || [];
}

export async function getConnection(userId, platformName) {
  const { data, error } = await supabase
    .from('platform_connections')
    .select('id, platform_name, platform_username, platform_user_id, platform_base_url, connection_status, created_at')
    .eq('user_id', userId)
    .eq('platform_name', platformName)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data || null;
}

export async function deleteConnection(id) {
  const { error } = await supabase
    .from('platform_connections')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
