import React from 'react';
import { Zap, TrendingUp, Users, Globe, Shield, Star } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      title: "AI-Powered Content",
      description: "Generate engaging posts, captions, and hashtags with our advanced AI writing assistant."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      title: "Smart Scheduling",
      description: "Post at optimal times across all platforms with our intelligent scheduling system."
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Team Collaboration",
      description: "Work together seamlessly with approval workflows and team management tools."
    },
    {
      icon: <Globe className="h-8 w-8 text-indigo-600" />,
      title: "Multi-Platform",
      description: "Manage all your social accounts from one dashboard with native integrations."
    },
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: "Enterprise Security",
      description: "Bank-level security with SOC 2 compliance and advanced permission controls."
    },
    {
      icon: <Star className="h-8 w-8 text-yellow-600" />,
      title: "Analytics & Insights",
      description: "Track performance with detailed analytics and actionable growth insights."
    }
  ];

  return (
    <div id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to grow your social presence
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From content creation to performance tracking, we've got all the tools you need in one powerful platform.
          </p>
        </div>        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AnimatedSection
              key={index}
              animationType="fadeInUp"
              delay={index * 100}
              className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
