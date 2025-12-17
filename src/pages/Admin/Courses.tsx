import React from 'react';

const Courses: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Courses</h1>
        <p className="text-text-secondary mt-1">Manage course offerings and curriculum</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
        <h2 className="text-lg font-semibold mb-2">Course Management</h2>
        <p className="text-text-secondary">Course management features coming soon...</p>
      </div>
    </div>
  );
};

export default Courses;