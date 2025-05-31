import React, { useState } from 'react';
import { MessageSquare, Users, Trophy, Calendar, ThumbsUp, MessageCircle, Share2, Pin, Clock } from 'lucide-react';
import Card from '../components/Card';

const Community = ({ onBackToLanding }) => {
  const [activeTab, setActiveTab] = useState('discussions');

  const stats = [
    { label: 'Active Members', value: '12.5K', icon: <Users className="w-6 h-6 text-blue-600" /> },
    { label: 'Discussions', value: '3.2K', icon: <MessageSquare className="w-6 h-6 text-green-600" /> },
    { label: 'Solutions Shared', value: '8.9K', icon: <Trophy className="w-6 h-6 text-purple-600" /> },
    { label: 'Events This Month', value: '15', icon: <Calendar className="w-6 h-6 text-orange-600" /> }
  ];

  const categories = [
    { name: 'General Discussion', posts: 234, members: 5600, color: 'bg-blue-100 text-blue-800' },
    { name: 'Content Creation', posts: 189, members: 4200, color: 'bg-green-100 text-green-800' },
    { name: 'Analytics & Insights', posts: 156, members: 3800, color: 'bg-purple-100 text-purple-800' },
    { name: 'Platform Updates', posts: 78, members: 2900, color: 'bg-orange-100 text-orange-800' },
    { name: 'Success Stories', posts: 92, members: 3100, color: 'bg-pink-100 text-pink-800' },
    { name: 'Feature Requests', posts: 145, members: 2700, color: 'bg-indigo-100 text-indigo-800' }
  ];

  const discussions = [
    {
      id: 1,
      title: "Best practices for scheduling Instagram Reels in 2025?",
      author: "Sarah M.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b44a?w=40&h=40&fit=crop&crop=face",
      category: "Content Creation",
      replies: 23,
      likes: 45,
      time: "2 hours ago",
      isPinned: false,
      tags: ["instagram", "reels", "scheduling"]
    },
    {
      id: 2,
      title: "🔥 PINNED: Welcome new members! Start here",
      author: "Community Team",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      category: "General Discussion",
      replies: 156,
      likes: 289,
      time: "1 week ago",
      isPinned: true,
      tags: ["welcome", "getting-started"]
    },
    {
      id: 3,
      title: "Analytics deep dive: Understanding engagement rates across platforms",
      author: "Mike Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      category: "Analytics & Insights",
      replies: 34,
      likes: 67,
      time: "4 hours ago",
      isPinned: false,
      tags: ["analytics", "engagement", "metrics"]
    },
    {
      id: 4,
      title: "Case Study: How I grew my followers from 1K to 50K in 6 months",
      author: "Emma Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      category: "Success Stories",
      replies: 89,
      likes: 234,
      time: "1 day ago",
      isPinned: false,
      tags: ["growth", "case-study", "success"]
    },
    {
      id: 5,
      title: "Feature Request: Bulk editing for scheduled posts",
      author: "Alex Park",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      category: "Feature Requests",
      replies: 12,
      likes: 28,
      time: "6 hours ago",
      isPinned: false,
      tags: ["feature-request", "bulk-edit", "scheduling"]
    }
  ];

  const events = [
    {
      title: "Weekly Community Call: Q&A with Product Team",
      date: "June 5, 2025",
      time: "2:00 PM EST",
      attendees: 45,
      type: "Virtual"
    },
    {
      title: "Content Creator Workshop: Video Marketing Trends",
      date: "June 8, 2025",
      time: "1:00 PM EST",
      attendees: 89,
      type: "Workshop"
    },
    {
      title: "Ask Me Anything: Social Media Strategy",
      date: "June 12, 2025",
      time: "3:00 PM EST",
      attendees: 67,
      type: "AMA"
    }
  ];

  const topContributors = [
    { name: "Sarah Chen", points: 2450, avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b44a?w=40&h=40&fit=crop&crop=face", badge: "Expert" },
    { name: "Mike Rodriguez", points: 1890, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face", badge: "Helper" },
    { name: "Emma Thompson", points: 1567, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face", badge: "Contributor" },
    { name: "Alex Park", points: 1234, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face", badge: "Rising Star" }
  ];  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
        {onBackToLanding && (
          <div className="flex justify-start mb-4">
            <button
              onClick={onBackToLanding}
              className="text-blue-600 hover:text-blue-800 flex items-center space-x-2 transition-colors"
            >
              <span>← Back to Home</span>
            </button>
          </div>
        )}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">PromoPilot Community</h1>
        <p className="text-xl text-gray-600 mb-8">
          Connect, learn, and grow with fellow creators and marketers
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-center mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {['discussions', 'events'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Discussions Tab */}
          {activeTab === 'discussions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Recent Discussions</h2>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  New Discussion
                </button>
              </div>
              
              {discussions.map((discussion) => (
                <Card key={discussion.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start space-x-3">
                    <img
                      src={discussion.avatar}
                      alt={discussion.author}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        {discussion.isPinned && <Pin className="w-4 h-4 text-blue-600" />}
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {discussion.title}
                        </h3>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                        <span>{discussion.author}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${categories.find(c => c.name === discussion.category)?.color || 'bg-gray-100 text-gray-800'}`}>
                          {discussion.category}
                        </span>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {discussion.time}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center">
                          <ThumbsUp className="w-3 h-3 mr-1" />
                          {discussion.likes}
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="w-3 h-3 mr-1" />
                          {discussion.replies}
                        </div>
                        <div className="flex items-center space-x-1">
                          {discussion.tags.map((tag, index) => (
                            <span key={index} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Upcoming Events</h2>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Suggest Event
                </button>
              </div>
              
              {events.map((event, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">{event.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {event.date} at {event.time}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {event.attendees} attending
                        </div>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          {event.type}
                        </span>
                      </div>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                      Join
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Categories */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
            <div className="space-y-3">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <div>
                    <div className="font-medium text-sm text-gray-900">{category.name}</div>
                    <div className="text-xs text-gray-500">{category.members} members</div>
                  </div>
                  <span className="text-xs text-gray-500">{category.posts} posts</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Contributors */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Top Contributors</h3>
            <div className="space-y-3">
              {topContributors.map((contributor, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={contributor.avatar}
                      alt={contributor.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{index + 1}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900">{contributor.name}</div>
                    <div className="text-xs text-gray-500">{contributor.points} points</div>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                    {contributor.badge}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                📋 Community Guidelines
              </button>
              <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                🏆 Leaderboard
              </button>
              <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                📊 Weekly Digest
              </button>
              <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                💡 Feature Requests
              </button>
            </div>
          </Card>        </div>
      </div>
      </div>
    </div>
  );
};

export default Community;
