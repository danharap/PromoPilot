import React from 'react';
import { ArrowRight, Play, Check, Star } from 'lucide-react';

const HeroSection = ({ onGetStarted }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-8 animate-fadeInDown">
            <Star className="w-4 h-4 mr-2" />
            Trusted by 50,000+ creators worldwide
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            Create, Schedule & Amplify Your 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Social Media</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            The all-in-one platform that helps you create engaging content, schedule posts across platforms, 
            and grow your audience with AI-powered insights.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <button
              onClick={onGetStarted}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium rounded-lg transition-colors flex items-center hover:scale-105 transform"
            >
              Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 text-lg font-medium rounded-lg transition-colors flex items-center hover:scale-105 transform">
              <Play className="mr-2 h-5 w-5" /> Watch Demo
            </button>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-gray-500 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
            <div className="flex items-center">
              <Check className="w-4 h-4 text-green-500 mr-2" />
              14-day free trial
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 text-green-500 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 text-green-500 mr-2" />
              Cancel anytime
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
