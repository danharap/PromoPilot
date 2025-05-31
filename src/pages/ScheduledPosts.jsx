import React, { useState } from 'react';
import { Filter, Instagram, Twitter, MessageSquare, Play, Clock, Check, Eye, Edit, Trash2 } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { mockPosts } from '../data/mockPosts';

const ScheduledPosts = () => {
  const [filter, setFilter] = useState('all');
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Scheduled Posts</h2>
        <Button>Create New Post</Button>
      </div>

      <Card className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <Filter className="w-5 h-5 text-gray-500" />
          <select 
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Posts</option>
            <option value="scheduled">Scheduled</option>
            <option value="posted">Posted</option>
            <option value="failed">Failed</option>
          </select>
          
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option value="all">All Platforms</option>
            <option value="instagram">Instagram</option>
            <option value="twitter">Twitter</option>
            <option value="tiktok">TikTok</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Preview</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Platforms</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Caption</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Scheduled</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockPosts.map((post) => (
                <tr key={post.id} className="border-b border-gray-100">
                  <td className="py-4 px-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                      {post.thumbnail}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      {post.platforms.map((platform) => (
                        <div key={platform} className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
                          {platform === 'instagram' && <Instagram className="w-4 h-4" />}
                          {platform === 'twitter' && <Twitter className="w-4 h-4" />}
                          {platform === 'tiktok' && <Play className="w-4 h-4" />}
                          {platform === 'reddit' && <MessageSquare className="w-4 h-4" />}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-900 truncate max-w-xs">{post.caption}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-600">{post.scheduledTime}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      post.status === 'scheduled' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {post.status === 'scheduled' ? <Clock className="w-3 h-3 mr-1" /> : <Check className="w-3 h-3 mr-1" />}
                      {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ScheduledPosts;
