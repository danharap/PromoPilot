import React from 'react';
import { BarChart3, TrendingUp, Users, Heart } from 'lucide-react';
import Card from '../components/Card';

const Analytics = () => {
  const analyticsData = [
    { title: "Total Reach", value: "12.5K", change: "+15%", icon: Users, trend: "up" },
    { title: "Engagement Rate", value: "4.8%", change: "+0.5%", icon: Heart, trend: "up" },
    { title: "Clicks", value: "1,234", change: "+8%", icon: TrendingUp, trend: "up" },
    { title: "Conversions", value: "89", change: "-2%", icon: BarChart3, trend: "down" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-8 h-8 text-blue-600" />
                <span className={`text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </Card>
          );
        })}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
        <div className="text-center py-12">
          <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Detailed analytics charts coming soon.</p>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;
