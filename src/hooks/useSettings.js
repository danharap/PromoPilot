import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getSettings, upsertSettings, getProfile, upsertProfile } from '../services/settings';
import { getConnections } from '../services/platformConnections';

export function useSettings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState(null);
  const [profile, setProfile] = useState(null);
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const [settingsData, profileData, connectionsData] = await Promise.all([
        getSettings(user.id),
        getProfile(user.id),
        getConnections(user.id),
      ]);
      setSettings(settingsData);
      setProfile(profileData);
      setConnections(connectionsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  const saveSettings = async (updates) => {
    setSaving(true);
    setError(null);
    try {
      const updated = await upsertSettings(user.id, updates);
      setSettings(updated);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const saveProfile = async (updates) => {
    setSaving(true);
    setError(null);
    try {
      const updated = await upsertProfile(user.id, updates);
      setProfile(updated);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  return {
    settings,
    profile,
    connections,
    loading,
    saving,
    error,
    refetch: load,
    saveSettings,
    saveProfile,
  };
}
