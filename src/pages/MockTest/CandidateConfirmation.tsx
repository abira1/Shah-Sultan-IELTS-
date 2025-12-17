import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Check } from 'lucide-react';

const CandidateConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);

  const candidateDetails = {
    name: "John Smith",
    dateOfBirth: "15 March 1995",
    candidateNumber: "UK12345678"
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => {
      navigate('/mock-test/listening-instructions');
    }, 1500);
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #e6eef7, #d6e3f0)' }}>
      {/* Official IELTS Header - Exact Match */}
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

      {/* Main Content - Centered Card */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-8">
        <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 border border-gray-300">
          {/* Header with Icon - Exact Official Style */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full border border-gray-300">
              <User className="w-6 h-6 text-gray-600" />
            </div>
            <h2 className="text-xl font-medium text-gray-800">Confirm your details</h2>
          </div>

          {/* Candidate Details - Official Layout */}
          <div className="space-y-4 mb-6">
            <div className="flex">
              <span className="text-gray-700 font-medium w-32">Name:</span>
              <span className="text-gray-900">{candidateDetails.name}</span>
            </div>

            <div className="flex">
              <span className="text-gray-700 font-medium w-32">Date of birth:</span>
              <span className="text-gray-900">{candidateDetails.dateOfBirth}</span>
            </div>

            <div className="flex">
              <span className="text-gray-700 font-medium w-32">Candidate number:</span>
              <span className="text-gray-900">{candidateDetails.candidateNumber}</span>
            </div>
          </div>

          {/* Information Notice - Official Blue Style */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-xs font-bold">i</span>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                If your details are not correct, please inform the invigilator.
              </p>
            </div>
          </div>

          {/* Confirmation Button - Official Style */}
          <div className="text-center">
            <button
              onClick={handleConfirm}
              disabled={confirmed}
              className={`py-3 px-8 rounded border font-medium transition-colors ${
                confirmed 
                  ? 'bg-green-100 border-green-300 text-green-700' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800 border-gray-400'
              }`}
            >
              {confirmed ? (
                <div className="flex items-center">
                  <Check className="w-4 h-4 mr-2" />
                  Confirmed
                </div>
              ) : (
                'My details are correct'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateConfirmation;