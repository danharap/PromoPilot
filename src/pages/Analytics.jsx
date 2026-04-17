import React from 'react';
import { BarChart3, TrendingUp, Users, Heart, Clock } from 'lucide-react';
import Card from '../components/Card';

const METRICS = [
  { title: 'Total Reach', icon: Users },
  { title: 'Engagement Rate', icon: Heart },
  { title: 'Clicks', icon: TrendingUp },
  { title: 'Conversions', icon: BarChart3 },
];

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <Clock className="w-3 h-3 mr-1" />
          Coming Soon
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {METRICS.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title} className="p-6 opacity-50">
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-8 h-8 text-gray-400" />
                <span className="text-sm font-medium text-gray-400">—</span>
              </div>
              <h3 className="font-medium text-gray-500 mb-1">{metric.title}</h3>
              <p className="text-2xl font-bold text-gray-300">—</p>
            </Card>
          );
        })}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
        <div className="text-center py-16">
          <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-900 font-medium mb-2">Analytics not yet available</p>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">
            Analytics data will populate here once you have published posts. Connect your Mastodon
            account and start publishing to see reach, engagement, and click metrics.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;
