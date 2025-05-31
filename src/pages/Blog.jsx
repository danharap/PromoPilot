import React, { useState } from 'react';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import Card from '../components/Card';

const Blog = ({ onBackToLanding }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Tips & Tricks', 'Industry News', 'Case Studies', 'Product Updates', 'Marketing'];

  const featuredPost = {
    title: "The Future of AI in Social Media Marketing: 2025 Trends",
    excerpt: "Discover how artificial intelligence is revolutionizing social media marketing and what trends to watch for in 2025. From automated content creation to predictive analytics.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    author: "Sarah Chen",
    date: "May 25, 2025",
    readTime: "8 min read",
    category: "Industry News",
    featured: true
  };

  const blogPosts = [
    {
      title: "10 Content Creation Hacks That Will Save You Hours",
      excerpt: "Learn proven strategies to streamline your content creation process and boost productivity.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
      author: "Mike Rodriguez",
      date: "May 20, 2025",
      readTime: "5 min read",
      category: "Tips & Tricks"
    },
    {
      title: "Case Study: How Bloom Coffee Co. Increased Engagement by 300%",
      excerpt: "A deep dive into how one coffee company transformed their social media presence.",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=250&fit=crop",
      author: "Emma Thompson",
      date: "May 18, 2025",
      readTime: "12 min read",
      category: "Case Studies"
    },
    {
      title: "New Feature: Advanced Analytics Dashboard",
      excerpt: "Introducing our most powerful analytics tools yet, with real-time insights and predictive metrics.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      author: "Alex Park",
      date: "May 15, 2025",
      readTime: "4 min read",
      category: "Product Updates"
    },
    {
      title: "The Psychology Behind Viral Content",
      excerpt: "Understanding what makes content shareable and how to apply these principles to your strategy.",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=250&fit=crop",
      author: "Dr. Lisa Wang",
      date: "May 12, 2025",
      readTime: "7 min read",
      category: "Marketing"
    },
    {
      title: "Platform Updates: Instagram Reels Algorithm Changes",
      excerpt: "What you need to know about the latest Instagram algorithm updates and how to adapt.",
      image: "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=400&h=250&fit=crop",
      author: "Jordan Kim",
      date: "May 10, 2025",
      readTime: "6 min read",
      category: "Industry News"
    },
    {
      title: "Building a Content Calendar That Actually Works",
      excerpt: "Step-by-step guide to creating and maintaining an effective content calendar for your brand.",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=250&fit=crop",
      author: "Rachel Green",
      date: "May 8, 2025",
      readTime: "9 min read",
      category: "Tips & Tricks"
    }
  ];

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center py-12">
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">PromoPilot Blog</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Stay updated with the latest insights, tips, and trends in social media marketing
        </p>
      </div>

      {/* Featured Post */}
      <Card className="overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img 
              src={featuredPost.image} 
              alt={featuredPost.title}
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <div className="flex items-center space-x-2 mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Featured
              </span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {featuredPost.category}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{featuredPost.title}</h2>
            <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {featuredPost.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {featuredPost.date}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {featuredPost.readTime}
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-800 flex items-center font-medium">
                Read More <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                  {post.category}
                </span>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  {post.readTime}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center">
                  <User className="w-3 h-3 mr-1" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {post.date}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Newsletter Signup */}
      <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Stay in the Loop</h2>
          <p className="text-gray-600 mb-6">
            Get the latest blog posts, tips, and updates delivered straight to your inbox
          </p>
          <div className="max-w-md mx-auto flex space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
              Subscribe
            </button>
          </div>        </div>
      </Card>
      </div>
    </div>
  );
};

export default Blog;
