import React from 'react';
import SoftcoverCard from './SoftcoverCard';

const SoftcoverDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Softcover Book Type</h1>
        <div className="max-w-md mx-auto">
          <SoftcoverCard />
        </div>
      </div>
    </div>
  );
};

export default SoftcoverDemo; 