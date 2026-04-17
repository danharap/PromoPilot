import React, { useState, useEffect } from 'react';
import { Check, AlertCircle, RefreshCw } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth } from '../contexts/AuthContext';
import { useSettings } from '../hooks/useSettings';
import { deleteConnection } from '../services/platformConnections';
import { buildMastodonOAuthStartUrl } from '../services/platforms';

const PLATFORM_DISPLAY = [
  { id: 'mastodon', name: 'Mastodon', description: 'Connect any Mastodon-compatible server' },
  { id: 'instagram', name: 'Instagram', description: 'Coming soon' },
  { id: 'tiktok', name: 'TikTok', description: 'Coming soon' },
  { id: 'reddit', name: 'Reddit', description: 'Coming soon' },
];

const Settings = () => {
  const { user } = useAuth();
  const { settings, profile, connections, loading, saving, error, saveSettings, saveProfile, refetch } = useSettings();

  const [businessProfile, setBusinessProfile] = useState({
    business_name: '',
    industry: '',
    website: '',
    description: '',
  });

  const [notifications, setNotifications] = useState({
    posts: true,
    engagement: true,
    weekly: false,
  });

  const [aiPrefs, setAiPrefs] = useState({
    tone: 'professional',
    frequency: 'medium',
  });

  const [profileSaveMsg, setProfileSaveMsg] = useState('');
  const [settingsSaveMsg, setSettingsSaveMsg] = useState('');
  const [disconnecting, setDisconnecting] = useState(null);
  const [mastodonInstance, setMastodonInstance] = useState('mastodon.social');

  useEffect(() => {
    if (profile) {
      setBusinessProfile({
        business_name: profile.business_name || '',
        industry: profile.industry || '',
        website: profile.website || '',
        description: profile.description || '',
      });
    }
  }, [profile]);

  useEffect(() => {
    if (settings) {
      if (settings.notification_preferences) {
        setNotifications(settings.notification_preferences);
      }
      if (settings.ai_voice_preferences) {
        setAiPrefs(settings.ai_voice_preferences);
      }
    }
  }, [settings]);

  const handleProfileSave = async () => {
    try {
      await saveProfile(businessProfile);
      setProfileSaveMsg('Saved!');
      setTimeout(() => setProfileSaveMsg(''), 2500);
    } catch (err) {
      setProfileSaveMsg('Error: ' + err.message);
    }
  };

  const handleSettingsSave = async () => {
    try {
      await saveSettings({
        notification_preferences: notifications,
        ai_voice_preferences: aiPrefs,
      });
      setSettingsSaveMsg('Saved!');
      setTimeout(() => setSettingsSaveMsg(''), 2500);
    } catch (err) {
      setSettingsSaveMsg('Error: ' + err.message);
    }
  };

  const handleConnectMastodon = () => {
    if (!user?.id) return;
    const inst = (mastodonInstance || '').trim();
    if (!inst) {
      alert('Enter your Mastodon server (e.g. mastodon.social).');
      return;
    }
    window.location.href = buildMastodonOAuthStartUrl(user.id, inst);
  };

  const handleDisconnect = async (connectionId) => {
    if (!window.confirm('Disconnect this account?')) return;
    setDisconnecting(connectionId);
    try {
      await deleteConnection(connectionId);
      await refetch();
    } catch (err) {
      alert('Failed to disconnect: ' + err.message);
    } finally {
      setDisconnecting(null);
    }
  };

  const getConnection = (platformId) =>
    connections.find(c => c.platform_name === platformId) || null;

  if (loading) {
    return (
      <div className="max-w-4xl space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <div className="py-12 text-center text-gray-500">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          Loading settings...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-red-500" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account</h3>
        <p className="text-sm text-gray-600 mb-1">You are signed in with your Supabase account:</p>
        <p className="text-base font-medium text-gray-900">{user?.email || '—'}</p>
        <p className="text-xs text-gray-400 mt-2 break-all">User id: {user?.id || '—'}</p>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Business Name"
            value={businessProfile.business_name}
            onChange={(e) => setBusinessProfile(prev => ({ ...prev, business_name: e.target.value }))}
          />
          <Input
            label="Industry"
            value={businessProfile.industry}
            onChange={(e) => setBusinessProfile(prev => ({ ...prev, industry: e.target.value }))}
          />
          <Input
            label="Website"
            value={businessProfile.website}
            onChange={(e) => setBusinessProfile(prev => ({ ...prev, website: e.target.value }))}
            className="md:col-span-2"
          />
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
              value={businessProfile.description}
              onChange={(e) => setBusinessProfile(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>
        </div>
        <div className="mt-4 flex items-center space-x-3">
          <Button onClick={handleProfileSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
          {profileSaveMsg && (
            <span className={`text-sm ${profileSaveMsg.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>
              {profileSaveMsg}
            </span>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Platform Integrations</h3>
          <button onClick={refetch} className="p-1 text-gray-400 hover:text-gray-600">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-4">
          {PLATFORM_DISPLAY.map((platform) => {
            const conn = getConnection(platform.id);
            const isMastodon = platform.id === 'mastodon';
            const isConnected = !!conn;
            return (
              <div key={platform.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900">{platform.name}</h4>
                    {isConnected ? (
                      <p className="text-sm text-green-600">
                        Connected{conn.platform_username ? ` as @${conn.platform_username}` : ''}
                        {conn.platform_base_url && (
                          <span className="block text-xs text-gray-500 mt-0.5">{conn.platform_base_url}</span>
                        )}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500">{platform.description}</p>
                    )}
                  </div>
                  {isMastodon ? (
                    isConnected ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        type="button"
                        onClick={() => handleDisconnect(conn.id)}
                        disabled={disconnecting === conn.id}
                      >
                        {disconnecting === conn.id ? 'Disconnecting...' : 'Disconnect'}
                      </Button>
                    ) : (
                      <div className="flex flex-col sm:flex-row sm:items-end gap-2 shrink-0">
                        <Input
                          label="Server"
                          placeholder="mastodon.social"
                          value={mastodonInstance}
                          onChange={(e) => setMastodonInstance(e.target.value)}
                          className="min-w-[10rem]"
                        />
                        <Button size="sm" type="button" onClick={handleConnectMastodon}>
                          Connect
                        </Button>
                      </div>
                    )
                  ) : (
                    <Button variant="secondary" size="sm" type="button" disabled>
                      Coming Soon
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
        <div className="space-y-4">
          {[
            { key: 'posts', label: 'Post Notifications', description: 'Get notified when posts are published' },
            { key: 'engagement', label: 'Engagement Alerts', description: 'Get notified about likes, comments, and shares' },
            { key: 'weekly', label: 'Weekly Reports', description: 'Receive weekly performance summaries' },
          ].map(({ key, label, description }) => (
            <label key={key} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={notifications[key] || false}
                onChange={() => setNotifications(prev => ({ ...prev, [key]: !prev[key] }))}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <div>
                <span className="text-sm font-medium text-gray-700">{label}</span>
                <p className="text-xs text-gray-500">{description}</p>
              </div>
            </label>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Preferences</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content Tone</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={aiPrefs.tone}
              onChange={(e) => setAiPrefs(prev => ({ ...prev, tone: e.target.value }))}
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="friendly">Friendly</option>
              <option value="energetic">Energetic</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Posting Frequency</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={aiPrefs.frequency}
              onChange={(e) => setAiPrefs(prev => ({ ...prev, frequency: e.target.value }))}
            >
              <option value="low">Low (1-2 posts/week)</option>
              <option value="medium">Medium (3-5 posts/week)</option>
              <option value="high">High (Daily posting)</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex items-center space-x-3">
          <Button onClick={handleSettingsSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Preferences'}
          </Button>
          {settingsSaveMsg && (
            <span className={`text-sm flex items-center space-x-1 ${settingsSaveMsg.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>
              {!settingsSaveMsg.startsWith('Error') && <Check className="w-4 h-4" />}
              <span>{settingsSaveMsg}</span>
            </span>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Settings;
