import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Volume2, VolumeX, Play, CheckCircle } from 'lucide-react';

const SoundTest: React.FC = () => {
  const navigate = useNavigate();
  const [testCompleted, setTestCompleted] = useState(false);

  const handleTestComplete = () => {
    setTestCompleted(true);
    setTimeout(() => {
      navigate('/mock-test/candidate-confirmation');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with logos - exact British Council style */}
      <div className="bg-white shadow-sm border-b px-6 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-red-600 tracking-tight">IELTS™</div>
          </div>
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full mr-2"></div>
              <span className="text-sm font-semibold text-blue-600">BRITISH COUNCIL</span>
            </div>
            <div className="flex items-center">
              <div className="text-sm font-semibold text-green-600">idp</div>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-semibold text-red-900">Cambridge Assessment English</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="bg-white rounded border border-gray-300 p-8 max-w-xl w-full">
          
          {/* Icon and title */}
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center w-10 h-10 mr-4">
              <Volume2 className="w-6 h-6 text-gray-600" />
            </div>
            <h1 className="text-lg font-normal text-gray-800">Sound test</h1>
          </div>

          {/* Instructions */}
          <div className="space-y-4 mb-8">
            <p className="text-sm text-gray-700">
              Please test your sound to make sure you can hear the audio clearly during the listening test.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded p-3">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3 mt-0.5">
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                </div>
                <p className="text-sm text-blue-800">
                  Adjust your volume to a comfortable level before starting the test.
                </p>
              </div>
            </div>
          </div>

          {/* Audio test controls */}
          <div className="space-y-6 mb-8">
            <div className="flex items-center justify-center space-x-4">
              <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-50 text-sm">
                <Play className="w-4 h-4 mr-2" />
                Play sample
              </button>
              
              <div className="flex items-center space-x-2 text-gray-500">
                <VolumeX className="w-4 h-4" />
                <div className="w-20 h-2 bg-gray-200 rounded">
                  <div className="w-3/4 h-full bg-blue-500 rounded"></div>
                </div>
                <Volume2 className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Continue button */}
          <div className="text-center">
            <button
              onClick={handleTestComplete}
              disabled={testCompleted}
              className={`px-6 py-2 border rounded text-sm font-medium transition-all duration-300 ${
                testCompleted 
                  ? 'bg-green-100 border-green-300 text-green-700' 
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {testCompleted ? (
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Test completed
                </div>
              ) : (
                'I can hear the sound clearly'
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SoundTest;