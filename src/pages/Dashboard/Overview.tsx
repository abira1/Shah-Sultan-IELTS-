import React from 'react';
import { Calendar, Clock, TrendingUp, BarChart2, AlertCircle, ChevronRight, FileText, Bell } from 'lucide-react';
import Button from '../../components/ui/Button';
const Overview: React.FC = () => {
  return <div className="space-y-6">
      {/* Welcome section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-medium text-gray-900">
            Welcome back, John
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Here's what's happening with your progress
          </p>
        </div>
        <Button variant="primary" size="sm" to="/dashboard/exams">
          Take Mock Test
        </Button>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 mb-1">Current Band</p>
          <div className="flex items-baseline">
            <span className="text-2xl font-medium text-gray-900">7.0</span>
            <span className="ml-2 text-xs px-1.5 py-0.5 bg-green-50 text-green-700 rounded-full flex items-center">
              <TrendingUp className="h-3 w-3 mr-0.5" />
              +0.5
            </span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 mb-1">Tests Completed</p>
          <p className="text-2xl font-medium text-gray-900">5</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 mb-1">Upcoming Classes</p>
          <p className="text-2xl font-medium text-gray-900">3</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 mb-1">Study Hours</p>
          <p className="text-2xl font-medium text-gray-900">42</p>
        </div>
      </div>
      {/* Notices Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-900 flex items-center">
            <Bell className="h-4 w-4 text-gray-500 mr-2" />
            Important Notices
          </h2>
          <Button variant="outline" size="sm" to="/dashboard/notices" className="text-xs py-1 px-2">
            View All
          </Button>
        </div>
        <div className="p-4 space-y-3">
          <div className="border-l-2 border-red-500 bg-red-50 pl-3 py-2 rounded-sm">
            <div className="flex items-start">
              <AlertCircle className="h-4 w-4 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-700">
                  Exam Date Changed
                </p>
                <p className="text-xs text-red-600">
                  The Speaking exam scheduled for June 20 has been moved to June
                  22.
                </p>
              </div>
            </div>
          </div>
          <div className="border-l-2 border-primary pl-3 py-2 rounded-sm">
            <p className="text-sm font-medium text-gray-900">
              New Study Materials Available
            </p>
            <p className="text-xs text-gray-500">
              Check the resources section for updated writing task examples.
            </p>
          </div>
          <div className="border-l-2 border-gray-300 pl-3 py-2 rounded-sm">
            <p className="text-sm font-medium text-gray-900">
              Upcoming Workshop
            </p>
            <p className="text-xs text-gray-500">
              Join our IELTS Speaking strategies workshop on June 18 at 3:00 PM.
            </p>
          </div>
        </div>
      </div>
      {/* Next Exam Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-900">Next Exam</h2>
          <div className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
            In 2 days
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-base font-medium text-gray-900 mb-2">
            Full IELTS Mock Test
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-3 text-sm">
            <div>
              <p className="text-xs text-gray-500 mb-1">Date</p>
              <p className="flex items-center text-gray-900">
                <Calendar className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                June 15, 2023
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Time</p>
              <p className="flex items-center text-gray-900">
                <Clock className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                10:00 AM
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Duration</p>
              <p className="text-gray-900">2h 45m</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mb-4">
            This comprehensive mock test covers all four IELTS modules. Results
            will be available within 48 hours.
          </p>
          <Button variant="primary" size="sm" to="/dashboard/exams">
            Verify & Start Test
          </Button>
        </div>
      </div>
      {/* Available Exams */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-gray-900">Available Exams</h2>
          <Button variant="outline" size="sm" to="/dashboard/exams" className="text-xs py-1 px-2">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {['Speaking Practice', 'Writing Task 2', 'Listening Section'].map((exam, index) => <div key={index} className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                    {exam}
                  </h3>
                  <span className="text-xs bg-green-50 text-green-700 px-1.5 py-0.5 rounded-full flex-shrink-0 ml-1">
                    Available
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2 flex-grow">
                  {index === 0 && 'Practice your speaking skills with our AI-powered assessment tool.'}
                  {index === 1 && 'Essay writing practice with expert feedback and scoring.'}
                  {index === 2 && 'Advanced listening practice focusing on academic contexts.'}
                </p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-xs text-gray-500 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {index === 0 ? '30m' : index === 1 ? '40m' : '25m'}
                  </span>
                  <Button variant="outline" size="sm" to={`/dashboard/exams/${exam.toLowerCase().replace(' ', '-')}`} className="text-xs py-1 px-2 min-h-[28px]">
                    Start
                  </Button>
                </div>
              </div>)}
        </div>
      </div>
      {/* Study Progress */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-900 flex items-center">
            <BarChart2 className="h-4 w-4 text-gray-500 mr-2" />
            Your Progress
          </h2>
        </div>
        <div className="p-4">
          <div className="space-y-4 mb-4">
            {[{
            name: 'Listening',
            value: 75
          }, {
            name: 'Reading',
            value: 60
          }, {
            name: 'Writing',
            value: 45
          }, {
            name: 'Speaking',
            value: 80
          }].map(skill => <div key={skill.name}>
                <div className="flex justify-between mb-1">
                  <p className="text-xs font-medium text-gray-900">
                    {skill.name}
                  </p>
                  <p className="text-xs text-gray-500">{skill.value}%</p>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden" role="progressbar" aria-valuenow={skill.value} aria-valuemin={0} aria-valuemax={100}>
                  <div className="bg-primary h-1.5 rounded-full transition-all duration-500 ease-out" style={{
                width: `${skill.value}%`
              }}></div>
                </div>
              </div>)}
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:justify-between">
            <Button variant="outline" size="sm" to="/dashboard/resources" className="text-xs">
              Study Materials
            </Button>
            <Button variant="primary" size="sm" to="/dashboard/results" className="text-xs">
              View Results
            </Button>
          </div>
        </div>
      </div>
    </div>;
};
export default Overview;