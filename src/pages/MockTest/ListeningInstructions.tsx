import React, { useState } from 'react';
import { Info } from 'lucide-react';

interface ListeningInstructionsProps {
  onStartTest: () => void;
}

const ListeningInstructions: React.FC<ListeningInstructionsProps> = ({ onStartTest }) => {
  const [acknowledgedWarning, setAcknowledgedWarning] = useState(false);

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

      {/* Main content - British Council styling */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Test header */}
        <div className="bg-white rounded border border-gray-300 p-6 mb-6">
          <h1 className="text-xl font-bold text-gray-900 mb-2">IELTS Listening</h1>
          <p className="text-gray-700">Time: Approximately 30 minutes</p>
        </div>

        {/* Instructions sections - British Council style */}
        <div className="bg-white rounded border border-gray-300 p-6 mb-6">
          <h2 className="text-base font-bold text-gray-900 mb-4">INSTRUCTIONS TO CANDIDATES</h2>
          
          <ul className="space-y-2 text-gray-700 list-disc list-inside">
            <li>Answer all the questions.</li>
            <li>You can change your answers at any time during the test.</li>
          </ul>
        </div>

        <div className="bg-white rounded border border-gray-300 p-6 mb-6">
          <h2 className="text-base font-bold text-gray-900 mb-4">INFORMATION FOR CANDIDATES</h2>
          
          <ul className="space-y-2 text-gray-700 list-disc list-inside">
            <li>There are <strong>40 questions</strong> in this test.</li>
            <li>Each question carries <strong>one mark</strong>.</li>
            <li>There are <strong>four parts</strong> to the test.</li>
            <li>You will hear each part <strong>once</strong>.</li>
            <li>For each part of the test there will be time for you to look through the questions and time for you to check your answers.</li>
          </ul>
        </div>

        {/* Important warning - British Council style */}
        <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-3">
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <Info className="w-2 h-2 text-white" />
              </div>
            </div>
            <p className="text-blue-800 font-medium">
              Do not click 'Start test' until you are told to do so.
            </p>
          </div>
        </div>

        {/* Start test button - British Council style */}
        <div className="text-center">
          <button
            onClick={() => {
              setAcknowledgedWarning(true);
              setTimeout(onStartTest, 500);
            }}
            disabled={acknowledgedWarning}
            className={`px-6 py-2 border rounded text-sm font-medium transition-all duration-300 ${
              acknowledgedWarning 
                ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed' 
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {acknowledgedWarning ? 'Starting test...' : 'Start test'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListeningInstructions;