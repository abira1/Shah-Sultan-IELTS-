import React from 'react';
import { Clock, Headphones } from 'lucide-react';

interface ListeningProps {
  onComplete: () => void;
}

const Listening: React.FC<ListeningProps> = ({ onComplete }) => {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #e6eef7, #d6e3f0)' }}>
      {/* Official IELTS Header */}
      <div className="bg-white border-b border-gray-300 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-red-600 tracking-wide">IELTS<span className="text-sm align-top">™</span></h1>
          </div>
          <div className="flex items-center space-x-6">
            {/* British Council Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full mr-0.5"></div>
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-sm font-semibold text-blue-600">BRITISH COUNCIL</span>
            </div>
            
            {/* IDP Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">idp</span>
              </div>
            </div>
            
            {/* Cambridge Assessment */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">CE</span>
              </div>
              <span className="text-sm font-semibold text-red-700">Cambridge Assessment English</span>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-8">
        <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-12 border border-gray-300 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <Headphones className="w-10 h-10 text-blue-600" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Listening Test
          </h2>

          {/* Coming Soon Message */}
          <div className="mb-8">
            <div className="text-6xl font-bold text-blue-600 mb-4">
              Coming Soon
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              The IELTS Listening Test interface is currently under development. 
              We're working hard to bring you an authentic exam experience.
            </p>
          </div>

          {/* Features Preview */}
          <div className="text-left bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-gray-800 mb-3">What to expect:</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>40 questions across 4 sections</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>Authentic IELTS audio recordings</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>Official test interface design</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>Real-time progress tracking</span>
              </li>
            </ul>
          </div>

          {/* Estimated Time */}
          <div className="flex items-center justify-center space-x-2 text-gray-500 mb-6">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Expected completion: Soon</span>
          </div>

          {/* Back Button */}
          <button
            onClick={onComplete}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Listening;