import React from 'react';
import { Instagram, Twitter, MessageSquare, Play, Clock, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/Card';
import Button from '../components/Button';
import { mockStats } from '../data/mockUser';
import { mockPosts } from '../data/mockPosts';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          Welcome back, {user?.name ? user.name.split(' ')[0] : 'User'}! 👋
        </h2>
        <p className="text-blue-100">Ready to boost your social media presence?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-8 h-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">{stat.title}</h3>
              <p className="text-sm text-gray-500">{stat.change}</p>
            </Card>
          );
        })}
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Posts</h3>
          <Button>Create New Campaign</Button>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
