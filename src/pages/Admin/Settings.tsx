import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-text-secondary mt-1">Configure system preferences and academy settings</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
        <h2 className="text-lg font-semibold mb-2">System Settings</h2>
        <p className="text-text-secondary">Configuration options coming soon...</p>
      </div>
    </div>
  );
};

export default Settings;