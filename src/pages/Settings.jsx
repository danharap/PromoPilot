import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';

const Settings = () => {
  const { user, updateProfile, loading, error } = useAuth();
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: ''
  });

  const [notifications, setNotifications] = useState({
    posts: true,
    engagement: true,
    weekly: false
  });

  const [businessProfile, setBusinessProfile] = useState({
    businessName: '',
    industry: '',
    website: '',
    description: ''
  });

  // Initialize user profile data
  useEffect(() => {
    if (user) {
      setUserProfile({
        name: user.name || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleUserProfileChange = (key, value) => {
    setUserProfile(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleUserProfileSave = async () => {
    try {
      await updateProfile(userProfile);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile: ' + error.message);
    }
  };

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleBusinessProfileChange = (key, value) => {
    setBusinessProfile(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="max-w-4xl space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>

      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">User Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            value={userProfile.name}
            onChange={(e) => handleUserProfileChange('name', e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            value={userProfile.email}
            onChange={(e) => handleUserProfileChange('email', e.target.value)}
          />
        </div>
        <div className="mt-4">
          <Button onClick={handleUserProfileSave} disabled={loading}>
            {loading ? 'Saving...' : 'Save Profile'}
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Business Name"
            value={businessProfile.businessName}
            onChange={(e) => handleBusinessProfileChange('businessName', e.target.value)}
            placeholder="Enter your business name"
          />
          <Input
            label="Industry"
            value={businessProfile.industry}
            onChange={(e) => handleBusinessProfileChange('industry', e.target.value)}
            placeholder="e.g., Food & Beverage"
          />
          <Input
            label="Website"
            value={businessProfile.website}
            onChange={(e) => handleBusinessProfileChange('website', e.target.value)}
            placeholder="www.yourbusiness.com"
            className="md:col-span-2"
          />
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
              value={businessProfile.description}
              onChange={(e) => handleBusinessProfileChange('description', e.target.value)}
              placeholder="Tell us about your business..."
            />
          </div>
        </div>
        <div className="mt-4">
          <Button>Save Business Profile</Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Integrations</h3>
        <div className="space-y-4">
          {[
            { name: 'Instagram', status: 'disconnected', color: 'text-red-600' },
            { name: 'Twitter/X', status: 'disconnected', color: 'text-red-600' },
            { name: 'TikTok', status: 'disconnected', color: 'text-red-600' },
            { name: 'Reddit', status: 'disconnected', color: 'text-red-600' }
          ].map((platform) => (
            <div key={platform.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{platform.name}</h4>
                <p className={`text-sm ${platform.color}`}>
                  {platform.status === 'connected' ? 'Connected' : 'Not connected'}
                </p>
              </div>
              <Button 
                variant={platform.status === 'connected' ? 'secondary' : 'primary'}
                size="sm"
                onClick={() => alert(`${platform.name} integration coming soon!`)}
              >
                {platform.status === 'connected' ? 'Disconnect' : 'Connect'}
              </Button>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
        <div className="space-y-4">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={notifications.posts}
              onChange={() => handleNotificationChange('posts')}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <div>
              <span className="text-sm font-medium text-gray-700">Post Notifications</span>
              <p className="text-xs text-gray-500">Get notified when posts are published</p>
            </div>
          </label>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={notifications.engagement}
              onChange={() => handleNotificationChange('engagement')}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <div>
              <span className="text-sm font-medium text-gray-700">Engagement Alerts</span>
              <p className="text-xs text-gray-500">Get notified about likes, comments, and shares</p>
            </div>
          </label>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={notifications.weekly}
              onChange={() => handleNotificationChange('weekly')}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <div>
              <span className="text-sm font-medium text-gray-700">Weekly Reports</span>
              <p className="text-xs text-gray-500">Receive weekly performance summaries</p>
            </div>
          </label>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Preferences</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content Tone</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="friendly">Friendly</option>
              <option value="energetic">Energetic</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Posting Frequency</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="low">Low (1-2 posts/week)</option>
              <option value="medium">Medium (3-5 posts/week)</option>
              <option value="high">High (Daily posting)</option>
            </select>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
