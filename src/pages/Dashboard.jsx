import React from 'react';
import { Instagram, Globe, MessageSquare, Play, Clock, Check, PlusCircle, AlertCircle } from 'lucide-react';
import Card from '../components/Card';
import { useAuth } from '../contexts/AuthContext';
import { useScheduledPosts } from '../hooks/usePosts';

const PLATFORM_ICONS = {
  instagram: Instagram,
  mastodon: Globe,
  tiktok: Play,
  reddit: MessageSquare,
};

const StatusBadge = ({ status }) => {
  const config = {
    scheduled: { bg: 'bg-yellow-100', text: 'text-yellow-800', Icon: Clock },
    published: { bg: 'bg-green-100', text: 'text-green-800', Icon: Check },
    publishing: { bg: 'bg-blue-100', text: 'text-blue-800', Icon: Clock },
    failed: { bg: 'bg-red-100', text: 'text-red-800', Icon: AlertCircle },
    draft: { bg: 'bg-gray-100', text: 'text-gray-700', Icon: Clock },
  };
  const { bg, text, Icon } = config[status] || config.draft;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bg} ${text}`}>
      <Icon className="w-3 h-3 mr-1" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  const { posts, loading, error } = useScheduledPosts();

  const firstName = user?.email?.split('@')[0] || 'there';
  const scheduledCount = posts.filter(p => p.publish_status === 'scheduled').length;
  const publishedCount = posts.filter(p => p.publish_status === 'published').length;
  const upcomingPosts = posts.filter(p => p.publish_status === 'scheduled').slice(0, 5);

  const stats = [
    { title: 'Scheduled Posts', value: scheduledCount.toString(), change: 'Ready to publish' },
    { title: 'Published Posts', value: publishedCount.toString(), change: 'Total published' },
    { title: 'Total Posts', value: posts.length.toString(), change: 'In your account' },
    { title: 'Platforms', value: '1', change: 'Mastodon first' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {firstName}!</h2>
        <p className="text-blue-100">Ready to boost your social presence?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <PlusCircle className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">
                {loading ? '—' : stat.value}
              </span>
            </div>
            <h3 className="font-medium text-gray-900 mb-1">{stat.title}</h3>
            <p className="text-sm text-gray-500">{stat.change}</p>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Posts</h3>
        </div>

        {loading && (
          <div className="py-8 text-center text-gray-500">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            Loading posts...
          </div>
        )}

        {error && (
          <div className="py-4 text-center text-red-600">
            <AlertCircle className="w-5 h-5 mx-auto mb-1" />
            {error}
          </div>
        )}

        {!loading && !error && upcomingPosts.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            <p className="mb-2">No upcoming scheduled posts.</p>
            <p className="text-sm">Create your first post to get started.</p>
          </div>
        )}

        {!loading && !error && upcomingPosts.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Platform</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Content</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Scheduled</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {upcomingPosts.map((post) => {
                  const Icon = PLATFORM_ICONS[post.platform] || MessageSquare;
                  return (
                    <tr key={post.id} className="border-b border-gray-100">
                      <td className="py-4 px-4">
                        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm text-gray-900 truncate max-w-xs">{post.content}</p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm text-gray-600">
                          {post.scheduled_for
                            ? new Date(post.scheduled_for).toLocaleString()
                            : '—'}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <StatusBadge status={post.publish_status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;
