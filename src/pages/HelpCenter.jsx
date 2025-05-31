import React, { useState } from 'react';
import { Search, Book, MessageCircle, Video, FileText, ChevronRight, Star } from 'lucide-react';
import Card from '../components/Card';

const HelpCenter = ({ onBackToLanding }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      icon: <Book className="w-8 h-8 text-blue-600" />,
      title: "Getting Started",
      description: "Learn the basics of PromoPilot",
      articleCount: 12,
      articles: [
        "Setting up your first account",
        "Connecting social media platforms",
        "Creating your first post",
        "Understanding the dashboard"
      ]
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-green-600" />,
      title: "Content Creation",
      description: "Master AI-powered content tools",
      articleCount: 18,
      articles: [
        "Using AI writing assistant",
        "Image generation tips",
        "Hashtag optimization",
        "Content calendar planning"
      ]
    },
    {
      icon: <Video className="w-8 h-8 text-purple-600" />,
      title: "Video Tutorials",
      description: "Step-by-step video guides",
      articleCount: 8,
      articles: [
        "Platform overview walkthrough",
        "Advanced scheduling features",
        "Analytics deep dive",
        "Team collaboration setup"
      ]
    },
    {
      icon: <FileText className="w-8 h-8 text-orange-600" />,
      title: "API & Integrations",
      description: "Technical documentation",
      articleCount: 15,
      articles: [
        "API authentication",
        "Webhook configuration",
        "Third-party integrations",
        "Custom app development"
      ]
    }
  ];

  const popularArticles = [
    {
      title: "How to schedule posts across multiple platforms",
      views: "15.2k views",
      rating: 4.9
    },
    {
      title: "Best practices for AI-generated content",
      views: "12.8k views",
      rating: 4.8
    },
    {
      title: "Understanding analytics and insights",
      views: "10.5k views",
      rating: 4.7
    },
    {
      title: "Setting up team permissions and workflows",
      views: "8.9k views",
      rating: 4.9
    }
  ];

  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.articles.some(article => 
      article.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );  return (
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
        <p className="text-xl text-gray-600 mb-8">Find answers, guides, and resources to help you succeed</p>
        
        {/* Search */}
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for help articles, guides, or tutorials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Popular Articles */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {popularArticles.map((article, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer transition-colors">
              <h3 className="font-semibold text-gray-900 mb-2">{article.title}</h3>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{article.views}</span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>{article.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCategories.map((category, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">{category.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
                  <span className="text-sm text-gray-500">{category.articleCount} articles</span>
                </div>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="space-y-2">
                  {category.articles.slice(0, 3).map((article, articleIndex) => (
                    <div key={articleIndex} className="flex items-center text-sm text-gray-700 hover:text-blue-600 cursor-pointer">
                      <ChevronRight className="w-4 h-4 mr-2 text-gray-400" />
                      {article}
                    </div>
                  ))}
                  {category.articles.length > 3 && (
                    <div className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                      View all {category.articleCount} articles →
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Contact Support */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still need help?</h2>
          <p className="text-gray-600 mb-6">Can't find what you're looking for? Our support team is here to help.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
              Contact Support
            </button>
            <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg transition-colors">
              Schedule a Call
            </button>
          </div>        </div>
      </Card>
      </div>
    </div>
  );
};

export default HelpCenter;
