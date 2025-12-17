import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, HeadphonesIcon, FileText, PenTool, Mic, Search, Filter, ChevronDown, ChevronUp, Target, Sparkles, Zap, Star, TrendingUp, CheckCircle, Calendar, Users } from 'lucide-react';

const Exams = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('all');

  const stats = [
    { label: 'Listening', time: '30min', color: 'from-pink-400 to-red-400', emoji: '🎧' },
    { label: 'Reading', time: '60min', color: 'from-green-400 to-teal-400', emoji: '📖' },
    { label: 'Writing', time: '60min', color: 'from-purple-400 to-indigo-400', emoji: '✍️' },
    { label: 'Speaking', time: '14min', color: 'from-orange-400 to-yellow-400', emoji: '🎤' }
  ];

  const examTypes = [
    { id: 'all', name: 'All Tests' },
    { id: 'mock', name: 'Full Mock Tests' },
    { id: 'listening', name: 'Listening' },
    { id: 'reading', name: 'Reading' },
    { id: 'writing', name: 'Writing' },
    { id: 'speaking', name: 'Speaking' }
  ];

  const ieltsStructure = [
    {
      id: 'listening',
      name: 'Listening',
      duration: '30 minutes',
      questions: 40,
      description: 'Test your ability to understand spoken English',
      icon: <HeadphonesIcon className="h-6 w-6" />,
      color: 'bg-blue-500'
    },
    {
      id: 'reading',
      name: 'Reading',
      duration: '60 minutes',
      questions: 40,
      description: 'Test your reading skills',
      icon: <FileText className="h-6 w-6" />,
      color: 'bg-green-500'
    },
    {
      id: 'writing',
      name: 'Writing',
      duration: '60 minutes',
      questions: 2,
      description: 'Demonstrate your writing skills',
      icon: <PenTool className="h-6 w-6" />,
      color: 'bg-purple-500'
    },
    {
      id: 'speaking',
      name: 'Speaking',
      duration: '11-14 minutes',
      questions: 3,
      description: 'Face-to-face conversation',
      icon: <Mic className="h-6 w-6" />,
      color: 'bg-orange-500'
    }
  ];

  const handleStartExam = (examId: string) => {
    if (examId === 'listening') {
      navigate('/mock-test');
    } else {
      console.log(`Starting ${examId} exam - Coming Soon!`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-3xl opacity-90"></div>
          <div className="relative p-12 text-center">
            <div className="flex justify-center mb-4">
              <Sparkles className="h-16 w-16 text-yellow-300 animate-pulse" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              IELTS Exam Center
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Your journey to English proficiency starts here. Practice with confidence! ✨
            </p>
            
            <div className="mt-8">
              <button className="group inline-flex items-center px-8 py-4 text-lg font-semibold text-purple-600 bg-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <Play className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
                Start Your Journey
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
          {stats.map((item, index) => (
            <div key={index} className="group relative">
              <div className={`bg-gradient-to-br ${item.color} p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer`}>
                <div className="text-center">
                  <div className="text-3xl mb-2">{item.emoji}</div>
                  <div className="text-white font-bold text-lg mb-1">{item.label}</div>
                  <div className="text-white/80 text-sm">{item.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Search Section */}
        <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-white/50 mb-12">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-4 text-lg bg-white/80 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-300/50 focus:border-purple-400 transition-all placeholder-purple-300"
                  placeholder="Search for your perfect test... 🔍"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <button
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter className="h-5 w-5 mr-3" />
              Filter Tests
              {filterOpen ? <ChevronUp className="h-4 w-4 ml-3" /> : <ChevronDown className="h-4 w-4 ml-3" />}
            </button>
          </div>

          {filterOpen && (
            <div className="mt-8 p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-100">
              <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Choose Your Test Type
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {examTypes.map((type) => (
                  <button
                    key={type.id}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                      selectedType === type.id
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg'
                        : 'bg-white/80 text-purple-700 hover:bg-purple-100 shadow-sm'
                    }`}
                    onClick={() => setSelectedType(type.id)}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Practice Tests */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center bg-gradient-to-r from-orange-400 to-pink-400 text-white px-6 py-3 rounded-full shadow-lg">
              <Zap className="h-6 w-6 mr-3" />
              <h2 className="text-xl font-bold">Quick Practice Tests</h2>
              <Star className="h-5 w-5 ml-3 animate-spin" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ieltsStructure.map((section) => (
              <div key={section.id} className="group relative">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 p-6 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                  <div className="text-center">
                    <div className={`p-4 rounded-2xl ${section.color} text-white w-fit mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      {section.icon}
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2 text-lg">{section.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {section.duration} • {section.questions} questions
                    </p>
                    <button 
                      className="w-full py-3 bg-gradient-to-r from-purple-400 to-indigo-400 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all transform hover:scale-105"
                      onClick={() => handleStartExam(section.id)}
                    >
                      Start Practice
                    </button>
                  </div>
                  
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Stats */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 p-8 mb-12">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center bg-gradient-to-r from-green-400 to-blue-400 text-white px-6 py-3 rounded-full shadow-lg">
              <TrendingUp className="h-6 w-6 mr-3" />
              <h2 className="text-xl font-bold">Your Amazing Progress</h2>
              <CheckCircle className="h-5 w-5 ml-3 animate-pulse" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: '12', label: 'Tests Completed', color: 'from-blue-400 to-blue-600', emoji: '📊' },
              { value: '7.5', label: 'Average Band Score', color: 'from-green-400 to-green-600', emoji: '⭐' },
              { value: '45', label: 'Hours Practiced', color: 'from-purple-400 to-purple-600', emoji: '⏰' },
              { value: '8.0', label: 'Target Band Score', color: 'from-orange-400 to-orange-600', emoji: '🎯' }
            ].map((stat, index) => (
              <div key={index} className="group relative">
                <div className={`bg-gradient-to-br ${stat.color} p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 text-center text-white`}>
                  <div className="text-4xl mb-2">{stat.emoji}</div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-white/90 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scheduled Exams */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="bg-gradient-to-r from-indigo-400 to-purple-400 p-3 rounded-2xl mr-4">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Upcoming Scheduled Exams</h2>
                <p className="text-gray-600">Your exam calendar at a glance</p>
              </div>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-green-400 to-teal-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
              <Users className="h-4 w-4 mr-2 inline" />
              Book New Exam
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-center">
                <div className="lg:col-span-2">
                  <div className="font-bold text-gray-800 text-lg mb-1">Official IELTS Academic</div>
                  <div className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full w-fit">Computer-delivered</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-gray-800">Oct 15, 2025</div>
                  <div className="text-sm text-gray-600">9:00 AM - 12:30 PM</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-800 font-medium">British Council Center</div>
                  <div className="text-sm text-gray-600">Downtown Campus</div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <span className="px-4 py-2 bg-green-100 text-green-800 rounded-xl text-sm font-semibold">
                    ✅ Confirmed
                  </span>
                  <button className="px-4 py-2 bg-white text-blue-600 border border-blue-200 rounded-xl text-sm font-medium hover:bg-blue-50 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exams;
