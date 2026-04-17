import React, { useState } from 'react';
import { Filter, Globe, Instagram, MessageSquare, Play, Clock, Check, Eye, Trash2, AlertCircle, RefreshCw } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useScheduledPosts } from '../hooks/usePosts';

const PLATFORM_ICONS = {
  instagram: Instagram,
  mastodon: Globe,
  tiktok: Play,
  reddit: MessageSquare,
};

const STATUS_CONFIG = {
  scheduled: { bg: 'bg-yellow-100', text: 'text-yellow-800', Icon: Clock, label: 'Scheduled' },
  published: { bg: 'bg-green-100', text: 'text-green-800', Icon: Check, label: 'Published' },
  publishing: { bg: 'bg-blue-100', text: 'text-blue-800', Icon: Clock, label: 'Publishing' },
  failed: { bg: 'bg-red-100', text: 'text-red-800', Icon: AlertCircle, label: 'Failed' },
  draft: { bg: 'bg-gray-100', text: 'text-gray-700', Icon: Clock, label: 'Draft' },
};

const ScheduledPosts = ({ setCurrentPage }) => {
  const { posts, loading, error, refetch, remove } = useScheduledPosts();
  const [statusFilter, setStatusFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [deleting, setDeleting] = useState(null);
  const [expanded, setExpanded] = useState(null);

  const filtered = posts.filter((post) => {
    const statusMatch = statusFilter === 'all' || post.publish_status === statusFilter;
    const platformMatch = platformFilter === 'all' || post.platform === platformFilter;
    return statusMatch && platformMatch;
  });

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    setDeleting(id);
    try {
      await remove(id);
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Scheduled Posts</h2>
        <Button onClick={() => setCurrentPage && setCurrentPage('create')}>Create New Post</Button>
      </div>

      <Card className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="scheduled">Scheduled</option>
            <option value="published">Published</option>
            <option value="publishing">Publishing</option>
            <option value="failed">Failed</option>
          </select>

          <select
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
          >
            <option value="all">All Platforms</option>
            <option value="mastodon">Mastodon</option>
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="reddit">Reddit</option>
          </select>

          <button
            onClick={refetch}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
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

        {!loading && !error && filtered.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            <p className="mb-2">No posts found.</p>
            <p className="text-sm">
              {statusFilter !== 'all' || platformFilter !== 'all'
                ? 'Try changing your filters.'
                : 'Create your first post to get started.'}
            </p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Platform</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Content</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Scheduled</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((post) => {
                  const Icon = PLATFORM_ICONS[post.platform] || MessageSquare;
                  const statusCfg = STATUS_CONFIG[post.publish_status] || STATUS_CONFIG.draft;
                  const StatusIcon = statusCfg.Icon;
                  return (
                    <tr key={post.id} className="border-b border-gray-100">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-xs text-gray-500 capitalize">{post.platform}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm text-gray-900 truncate max-w-xs">{post.content}</p>
                        {post.error_message && (
                          <p className="text-xs text-red-500 mt-1 truncate max-w-xs">{post.error_message}</p>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm text-gray-600">
                          {post.scheduled_for
                            ? new Date(post.scheduled_for).toLocaleString()
                            : post.published_at
                              ? new Date(post.published_at).toLocaleString()
                              : '—'}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusCfg.bg} ${statusCfg.text}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusCfg.label}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            title={expanded === post.id ? 'Collapse' : 'View full content'}
                            onClick={() => setExpanded(expanded === post.id ? null : post.id)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {post.publish_status !== 'published' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              title="Delete"
                              onClick={() => handleDelete(post.id)}
                              disabled={deleting === post.id}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                    {expanded === post.id && (
                      <tr key={`${post.id}-expanded`} className="bg-gray-50">
                        <td colSpan={5} className="px-4 py-3">
                          <p className="text-sm text-gray-700 whitespace-pre-wrap">{post.content}</p>
                          {post.error_message && (
                            <p className="text-xs text-red-600 mt-2">Error: {post.error_message}</p>
                          )}
                        </td>
                      </tr>
                    )}
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

export default ScheduledPosts;
