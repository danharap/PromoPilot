import React from 'react';
import Card from '../components/Card';

const Campaigns = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Campaigns</h2>
      </div>

      <Card className="p-6">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
          <p className="text-gray-500">Campaign management features will be available soon.</p>
        </div>
      </Card>
    </div>
  );
};

export default Campaigns;
