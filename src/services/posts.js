import { supabase } from '../lib/supabase';

export async function getPosts(userId, filters = {}) {
  let query = supabase
    .from('posts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (filters.platform) {
    query = query.eq('platform', filters.platform);
  }

  if (filters.publish_status) {
    query = query.eq('publish_status', filters.publish_status);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getScheduledPosts(userId) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', userId)
    .in('publish_status', ['scheduled', 'published', 'failed', 'publishing'])
    .order('scheduled_for', { ascending: true });

  if (error) throw error;
  return data;
}

export async function createPost(postData) {
  const { data, error } = await supabase
    .from('posts')
    .insert([postData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updatePost(id, updates) {
  const { data, error } = await supabase
    .from('posts')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePost(id) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
