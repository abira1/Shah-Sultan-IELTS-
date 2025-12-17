import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Eye,
  Download,
  BarChart3,
  Settings,
  Calendar,
  FileText,
  Timer,
  UserCheck,
  XCircle
} from 'lucide-react';

interface Exam {
  id: string;
  title: string;
  section: 'listening' | 'reading' | 'writing' | 'speaking' | 'full-test';
  status: 'draft' | 'scheduled' | 'active' | 'completed' | 'cancelled';
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  totalQuestions: number;
  totalMarks: number;
  participants: number;
  maxParticipants: number;
  passingMarks: number;
  createdAt: string;
  instructions?: string;
}

interface ExamSession {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  startedAt: string;
  status: 'in-progress' | 'completed' | 'paused' | 'abandoned';
  timeRemaining: number; // in minutes
  questionsAnswered: number;
  currentScore: number;
  answers: Array<{
    questionId: string;
    answer: any;
    timeSpent: number;
  }>;
}

const ExamControl: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([
    {
      id: '1',
      title: 'IELTS Academic Reading Test - Practice 1',
      section: 'reading',
      status: 'active',
      startTime: '2024-03-20T09:00:00',
      endTime: '2024-03-20T10:00:00',
      duration: 60,
      totalQuestions: 40,
      totalMarks: 40,
      participants: 12,
      maxParticipants: 50,
      passingMarks: 24,
      createdAt: '2024-03-18',
      instructions: 'Read the passages carefully and answer all questions.'
    },
    {
      id: '2',
      title: 'IELTS Writing Task 2 - Environment',
      section: 'writing',
      status: 'scheduled',
      startTime: '2024-03-21T14:00:00',
      endTime: '2024-03-21T15:00:00',
      duration: 60,
      totalQuestions: 1,
      totalMarks: 30,
      participants: 0,
      maxParticipants: 30,
      passingMarks: 18,
      createdAt: '2024-03-19',
      instructions: 'Write a well-structured essay of at least 250 words.'
    },
    {
      id: '3',
      title: 'Full IELTS Mock Test',
      section: 'full-test',
      status: 'completed',
      startTime: '2024-03-19T09:00:00',
      endTime: '2024-03-19T12:00:00',
      duration: 180,
      totalQuestions: 120,
      totalMarks: 120,
      participants: 25,
      maxParticipants: 30,
      passingMarks: 72,
      createdAt: '2024-03-17'
    }
  ]);

  const [activeSessions, setActiveSessions] = useState<ExamSession[]>([
    {
      id: '1',
      examId: '1',
      studentId: 'std1',
      studentName: 'Sarah Ahmed',
      startedAt: '2024-03-20T09:15:00',
      status: 'in-progress',
      timeRemaining: 35,
      questionsAnswered: 25,
      currentScore: 20,
      answers: []
    },
    {
      id: '2',
      examId: '1',
      studentId: 'std2',
      studentName: 'Mohammad Rahman',
      startedAt: '2024-03-20T09:10:00',
      status: 'in-progress',
      timeRemaining: 40,
      questionsAnswered: 30,
      currentScore: 25,
      answers: []
    },
    {
      id: '3',
      examId: '1',
      studentId: 'std3',
      studentName: 'Fatima Khan',
      startedAt: '2024-03-20T09:05:00',
      status: 'completed',
      timeRemaining: 0,
      questionsAnswered: 40,
      currentScore: 35,
      answers: []
    }
  ]);

  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [showExamDetails, setShowExamDetails] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSectionIcon = (section: string) => {
    switch (section) {
      case 'listening': return <Users className="h-4 w-4" />;
      case 'reading': return <FileText className="h-4 w-4" />;
      case 'writing': return <FileText className="h-4 w-4" />;
      case 'speaking': return <Users className="h-4 w-4" />;
      case 'full-test': return <CheckCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getSessionStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'abandoned': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStartExam = (examId: string) => {
    setExams(exams.map(exam => 
      exam.id === examId ? { ...exam, status: 'active' } : exam
    ));
  };

  const handlePauseExam = (examId: string) => {
    setExams(exams.map(exam => 
      exam.id === examId ? { ...exam, status: 'scheduled' } : exam
    ));
  };

  const handleEndExam = (examId: string) => {
    setExams(exams.map(exam => 
      exam.id === examId ? { ...exam, status: 'completed' } : exam
    ));
    // End all active sessions for this exam
    setActiveSessions(activeSessions.map(session =>
      session.examId === examId ? { ...session, status: 'completed', timeRemaining: 0 } : session
    ));
  };

  const handleCancelExam = (examId: string) => {
    if (confirm('Are you sure you want to cancel this exam?')) {
      setExams(exams.map(exam => 
        exam.id === examId ? { ...exam, status: 'cancelled' } : exam
      ));
    }
  };

  const handleViewExamDetails = (exam: Exam) => {
    setSelectedExam(exam);
    setShowExamDetails(true);
  };

  const handleForceEndSession = (sessionId: string) => {
    if (confirm('Are you sure you want to force end this session?')) {
      setActiveSessions(activeSessions.map(session =>
        session.id === sessionId ? { ...session, status: 'completed', timeRemaining: 0 } : session
      ));
    }
  };

  const activeExams = exams.filter(exam => exam.status === 'active');
  const scheduledExams = exams.filter(exam => exam.status === 'scheduled');
  const inProgressSessions = activeSessions.filter(session => session.status === 'in-progress');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Settings className="h-6 w-6 mr-2 text-primary" />
              Exam Control Center
            </h1>
            <p className="text-gray-600 mt-1">Monitor and control all exam sessions in real-time</p>
          </div>
        </div>
      </div>

      {/* Live Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Play className="h-5 w-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Active Exams</p>
              <p className="text-2xl font-bold text-gray-900">{activeExams.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <UserCheck className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Students Online</p>
              <p className="text-2xl font-bold text-gray-900">{inProgressSessions.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Calendar className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-gray-900">{scheduledExams.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BarChart3 className="h-5 w-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Participants</p>
              <p className="text-2xl font-bold text-gray-900">
                {exams.reduce((acc, exam) => acc + exam.participants, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Sessions Monitor */}
      {inProgressSessions.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Timer className="h-5 w-5 mr-2 text-green-600" />
              Live Sessions ({inProgressSessions.length})
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {inProgressSessions.map((session) => {
              const exam = exams.find(e => e.id === session.examId);
              return (
                <div key={session.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-gray-900">{session.studentName}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getSessionStatusColor(session.status)}`}>
                          {session.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{exam?.title}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {session.timeRemaining}m remaining
                        </span>
                        <span className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          {session.questionsAnswered}/{exam?.totalQuestions} answered
                        </span>
                        <span className="flex items-center">
                          <BarChart3 className="h-4 w-4 mr-1" />
                          Score: {session.currentScore}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleForceEndSession(session.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        title="Force end session"
                      >
                        <XCircle className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Monitor session"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{Math.round((session.questionsAnswered / (exam?.totalQuestions || 1)) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.round((session.questionsAnswered / (exam?.totalQuestions || 1)) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Exam Management */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">All Exams</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {exams.map((exam) => (
            <div key={exam.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-1 bg-gray-100 rounded">
                      {getSectionIcon(exam.section)}
                    </div>
                    <h3 className="font-medium text-gray-900">{exam.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(exam.status)}`}>
                      {exam.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-600 mb-2">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(exam.startTime).toLocaleDateString()} - {new Date(exam.startTime).toLocaleTimeString()}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {exam.duration} minutes
                    </span>
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {exam.participants}/{exam.maxParticipants} participants
                    </span>
                    <span className="flex items-center">
                      <FileText className="h-4 w-4 mr-1" />
                      {exam.totalQuestions} questions
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Total Marks: {exam.totalMarks}</span>
                    <span>Passing: {exam.passingMarks}</span>
                    <span>Created: {exam.createdAt}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {exam.status === 'scheduled' && (
                    <button
                      onClick={() => handleStartExam(exam.id)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                      title="Start exam"
                    >
                      <Play className="h-4 w-4" />
                    </button>
                  )}
                  {exam.status === 'active' && (
                    <>
                      <button
                        onClick={() => handlePauseExam(exam.id)}
                        className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg"
                        title="Pause exam"
                      >
                        <Pause className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEndExam(exam.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        title="End exam"
                      >
                        <Square className="h-4 w-4" />
                      </button>
                    </>
                  )}
                  {(exam.status === 'scheduled' || exam.status === 'draft') && (
                    <button
                      onClick={() => handleCancelExam(exam.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      title="Cancel exam"
                    >
                      <XCircle className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleViewExamDetails(exam)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    title="View details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  {exam.status === 'completed' && (
                    <button
                      className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg"
                      title="Download results"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Exam Details Modal */}
      {showExamDetails && selectedExam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Exam Details</h2>
              <button
                onClick={() => setShowExamDetails(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Title</label>
                      <p className="text-gray-900">{selectedExam.title}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Section</label>
                      <p className="text-gray-900 capitalize">{selectedExam.section}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Status</label>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedExam.status)}`}>
                        {selectedExam.status}
                      </span>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Duration</label>
                      <p className="text-gray-900">{selectedExam.duration} minutes</p>
                    </div>
                  </div>
                </div>

                {/* Exam Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Exam Settings</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Total Questions</label>
                      <p className="text-gray-900">{selectedExam.totalQuestions}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Total Marks</label>
                      <p className="text-gray-900">{selectedExam.totalMarks}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Passing Marks</label>
                      <p className="text-gray-900">{selectedExam.passingMarks}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Participants</label>
                      <p className="text-gray-900">{selectedExam.participants} / {selectedExam.maxParticipants}</p>
                    </div>
                  </div>
                </div>

                {/* Schedule */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Schedule</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Start Time</label>
                      <p className="text-gray-900">
                        {new Date(selectedExam.startTime).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">End Time</label>
                      <p className="text-gray-900">
                        {new Date(selectedExam.endTime).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Created</label>
                      <p className="text-gray-900">{selectedExam.createdAt}</p>
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                {selectedExam.instructions && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Instructions</h3>
                    <p className="text-gray-600">{selectedExam.instructions}</p>
                  </div>
                )}
              </div>

              {/* Active Sessions for this exam */}
              {activeSessions.filter(session => session.examId === selectedExam.id).length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Active Sessions</h3>
                  <div className="space-y-3">
                    {activeSessions
                      .filter(session => session.examId === selectedExam.id)
                      .map(session => (
                        <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{session.studentName}</p>
                            <p className="text-sm text-gray-600">
                              {session.questionsAnswered}/{selectedExam.totalQuestions} answered • 
                              {session.timeRemaining}m remaining • 
                              Score: {session.currentScore}
                            </p>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getSessionStatusColor(session.status)}`}>
                            {session.status}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamControl;