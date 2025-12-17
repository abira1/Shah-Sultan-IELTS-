import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import CandidateConfirmation from './CandidateConfirmation';
import SoundTest from './SoundTest';
import ListeningInstructions from './ListeningInstructions';
import ListeningTest from './ListeningTest';

const ListeningExamFlow: React.FC = () => {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/mock-test/listening-test');
  };

  const handleTestComplete = () => {
    navigate('/dashboard/exams');
  };

  return (
    <div className="min-h-screen">
      <Routes>
        <Route 
          path="/" 
          element={<CandidateConfirmation />} 
        />
        <Route 
          path="/sound-test" 
          element={<SoundTest />} 
        />
        <Route 
          path="/instructions" 
          element={<ListeningInstructions onStartTest={handleStartTest} />} 
        />
        <Route 
          path="/test" 
          element={<ListeningTest onComplete={handleTestComplete} />} 
        />
      </Routes>
    </div>
  );
};

export default ListeningExamFlow;