import React, { useState } from 'react';
import { Instagram, Twitter, MessageSquare, Play, Upload, Check } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';

const CreatePost = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState(['instagram']);
  const [postNow, setPostNow] = useState(false);
  const [caption, setCaption] = useState('');

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-600' },
    { id: 'twitter', name: 'Twitter/X', icon: Twitter, color: 'text-blue-500' },
    { id: 'tiktok', name: 'TikTok', icon: Play, color: 'text-gray-900' },
    { id: 'reddit', name: 'Reddit', icon: MessageSquare, color: 'text-orange-500' }
  ];

  const togglePlatform = (platformId) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Create New Post</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Post Content</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="4"
                  placeholder="What's happening? Let AI help you craft the perfect post..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Media</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 mb-2">Drop your images or videos here</p>
                  <Button variant="secondary" size="sm">Browse Files</Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Platforms</h3>
            <div className="grid grid-cols-2 gap-3">
              {platforms.map((platform) => {
                const Icon = platform.icon;
                const isSelected = selectedPlatforms.includes(platform.id);
                return (
                  <button
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-blue-600' : platform.color}`} />
                    <span className="font-medium">{platform.name}</span>
                    {isSelected && <Check className="w-4 h-4 ml-auto" />}
                  </button>
                );
              })}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule</h3>
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  checked={postNow}
                  onChange={(e) => setPostNow(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Post immediately</span>
              </label>
              
              {!postNow && (
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Date" type="date" />
                  <Input label="Time" type="time" />
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
            <div className="space-y-4">
              {selectedPlatforms.map((platformId) => {
                const platform = platforms.find(p => p.id === platformId);
                const Icon = platform.icon;
                return (
                  <div key={platformId} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon className={`w-4 h-4 ${platform.color}`} />
                      <span className="text-sm font-medium text-gray-700">{platform.name}</span>
                    </div>
                    <div className="bg-gray-100 rounded p-2">
                      <p className="text-xs text-gray-600">
                        {caption || "Your post preview will appear here..."}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <div className="space-y-3">
            <Button className="w-full" size="lg">
              {postNow ? 'Post Now' : 'Schedule Post'}
            </Button>
            <p className="text-xs text-gray-500 text-center">
              This post will be published on all selected platforms using our AI assistant
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
