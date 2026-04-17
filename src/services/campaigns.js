import { supabase } from '../lib/supabase';

export async function getCampaigns(userId) {
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createCampaign(userId, campaignData) {
  const { data, error } = await supabase
    .from('campaigns')
    .insert([{ user_id: userId, ...campaignData }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateCampaign(id, updates) {
  const { data, error } = await supabase
    .from('campaigns')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteCampaign(id) {
  const { error } = await supabase
    .from('campaigns')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
