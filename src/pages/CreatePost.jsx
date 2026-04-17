import React, { useState } from 'react';
import { Globe, MessageSquare, Play, Upload, Check, AlertCircle, Instagram } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth } from '../contexts/AuthContext';
import { createPost } from '../services/posts';
import { MASTODON_PUBLISH_PATH } from '../services/platforms';

const PLATFORMS = [
  { id: 'mastodon', name: 'Mastodon', icon: Globe, color: 'text-purple-600' },
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-600', disabled: true },
  { id: 'tiktok', name: 'TikTok', icon: Play, color: 'text-gray-900', disabled: true },
  { id: 'reddit', name: 'Reddit', icon: MessageSquare, color: 'text-orange-500', disabled: true },
];

const MAX_MASTODON_CHARS = 500;

const CreatePost = ({ setCurrentPage }) => {
  const { user } = useAuth();
  const [selectedPlatforms, setSelectedPlatforms] = useState(['mastodon']);
  const [postNow, setPostNow] = useState(true);
  const [content, setContent] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const togglePlatform = (platformId) => {
    const platform = PLATFORMS.find(p => p.id === platformId);
    if (platform?.disabled) return;
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const mastodonSelected = selectedPlatforms.includes('mastodon');
  const charCount = content.length;
  const overLimit = mastodonSelected && charCount > MAX_MASTODON_CHARS;

  const handleSubmit = async () => {
    setSubmitError('');
    setSubmitSuccess('');

    if (!content.trim()) {
      setSubmitError('Please enter some content for your post.');
      return;
    }
    if (selectedPlatforms.length === 0) {
      setSubmitError('Please select at least one platform.');
      return;
    }
    if (overLimit) {
      setSubmitError(`Mastodon posts are limited to ${MAX_MASTODON_CHARS} characters here (your instance may allow more).`);
      return;
    }
    if (!postNow && (!scheduleDate || !scheduleTime)) {
      setSubmitError('Please select a date and time for scheduling.');
      return;
    }

    let scheduledFor = null;
    if (!postNow && scheduleDate && scheduleTime) {
      scheduledFor = new Date(`${scheduleDate}T${scheduleTime}`).toISOString();
      if (new Date(scheduledFor) <= new Date()) {
        setSubmitError('Scheduled time must be in the future.');
        return;
      }
    }

    setSubmitting(true);
    const errors = [];

    for (const platform of selectedPlatforms) {
      try {
        const postData = {
          user_id: user.id,
          platform,
          content: content.trim(),
          scheduled_for: scheduledFor,
          publish_status: postNow ? 'publishing' : 'scheduled',
        };

        const savedPost = await createPost(postData);

        if (postNow && platform === 'mastodon') {
          const res = await fetch(MASTODON_PUBLISH_PATH, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postId: savedPost.id, userId: user.id }),
          });
          const result = await res.json().catch(() => ({}));
          if (!res.ok) {
            errors.push(`${platform}: ${result.error || 'Publish failed'}`);
          }
        }
      } catch (err) {
        errors.push(`${platform}: ${err.message}`);
      }
    }

    setSubmitting(false);

    if (errors.length > 0) {
      setSubmitError(errors.join('\n'));
    } else {
      setSubmitSuccess(
        postNow
          ? 'Post submitted for publishing! Check Scheduled Posts for status.'
          : 'Post scheduled successfully!'
      );
      setContent('');
      setScheduleDate('');
      setScheduleTime('');
      setTimeout(() => {
        if (setCurrentPage) setCurrentPage('scheduled');
      }, 1500);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Create New Post</h2>
      </div>

      {submitError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-700 whitespace-pre-line">{submitError}</p>
        </div>
      )}
      {submitSuccess && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-3">
          <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-green-700">{submitSuccess}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Post Content</h3>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Content</label>
                  {mastodonSelected && (
                    <span className={`text-xs ${overLimit ? 'text-red-600 font-semibold' : 'text-gray-400'}`}>
                      {charCount}/{MAX_MASTODON_CHARS}
                    </span>
                  )}
                </div>
                <textarea
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    overLimit ? 'border-red-400' : 'border-gray-300'
                  }`}
                  rows="5"
                  placeholder="Write your post…"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Media
                  <span className="ml-2 text-xs font-normal text-gray-400">(coming soon)</span>
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center bg-gray-50 opacity-60 cursor-not-allowed select-none">
                  <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-400 mb-2 text-sm">Media uploads are not yet available</p>
                  <Button variant="secondary" size="sm" type="button" disabled>Browse Files</Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Platforms</h3>
            <div className="grid grid-cols-2 gap-3">
              {PLATFORMS.map((platform) => {
                const Icon = platform.icon;
                const isSelected = selectedPlatforms.includes(platform.id);
                return (
                  <button
                    key={platform.id}
                    type="button"
                    onClick={() => togglePlatform(platform.id)}
                    disabled={platform.disabled}
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                      platform.disabled
                        ? 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                        : isSelected
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isSelected && !platform.disabled ? 'text-blue-600' : platform.color}`} />
                    <span className="font-medium">{platform.name}</span>
                    {platform.disabled && (
                      <span className="ml-auto text-xs text-gray-400">Soon</span>
                    )}
                    {isSelected && !platform.disabled && <Check className="w-4 h-4 ml-auto" />}
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
                  <Input
                    label="Date"
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  <Input
                    label="Time"
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                  />
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
                const platform = PLATFORMS.find(p => p.id === platformId);
                if (!platform) return null;
                const Icon = platform.icon;
                return (
                  <div key={platformId} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon className={`w-4 h-4 ${platform.color}`} />
                      <span className="text-sm font-medium text-gray-700">{platform.name}</span>
                    </div>
                    <div className="bg-gray-100 rounded p-2">
                      <p className="text-xs text-gray-600 whitespace-pre-wrap">
                        {content || 'Your post preview will appear here...'}
                      </p>
                    </div>
                  </div>
                );
              })}
              {selectedPlatforms.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">Select a platform to see preview</p>
              )}
            </div>
          </Card>

          <div className="space-y-3">
            <Button
              className="w-full"
              size="lg"
              type="button"
              onClick={handleSubmit}
              disabled={submitting || overLimit || selectedPlatforms.length === 0}
            >
              {submitting ? 'Processing...' : postNow ? 'Post Now' : 'Schedule Post'}
            </Button>
            <p className="text-xs text-gray-500 text-center">
              {postNow
                ? 'Connect Mastodon in Settings before posting.'
                : 'Scheduled posts are picked up by the cron job (see docs/CRON_SETUP.md).'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
