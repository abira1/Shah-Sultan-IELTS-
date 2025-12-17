import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Image, 
  Quote, 
  BookOpen, 
  Star, 
  Users, 
  Mail, 
  Home,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import DataMigrationButton from '../../components/admin/DataMigrationButton';

const Overview: React.FC = () => {
  const quickLinks = [
    {
      name: 'Gallery Manager',
      description: 'Upload and manage gallery images',
      icon: <Image className="h-6 w-6" />,
      path: '/admin/gallery',
      color: 'from-purple-500 to-indigo-500',
      stats: '24 images',
    },
    {
      name: 'Testimonials',
      description: 'Manage student testimonials and reviews',
      icon: <Quote className="h-6 w-6" />,
      path: '/admin/testimonials',
      color: 'from-green-500 to-teal-500',
      stats: '8 testimonials',
    },
    {
      name: 'Courses',
      description: 'Update course information and pricing',
      icon: <BookOpen className="h-6 w-6" />,
      path: '/admin/courses',
      color: 'from-blue-500 to-cyan-500',
      stats: '3 courses',
    },
    {
      name: 'Features',
      description: 'Edit feature highlights on home page',
      icon: <Star className="h-6 w-6" />,
      path: '/admin/features',
      color: 'from-yellow-500 to-orange-500',
      stats: '6 features',
    },
    {
      name: 'Home Content',
      description: 'Manage hero section and about content',
      icon: <Home className="h-6 w-6" />,
      path: '/admin/home-content',
      color: 'from-pink-500 to-rose-500',
      stats: '5 sections',
    },
    {
      name: 'Teachers',
      description: 'Manage teacher profiles and information',
      icon: <Users className="h-6 w-6" />,
      path: '/admin/teachers',
      color: 'from-indigo-500 to-purple-500',
      stats: '4 teachers',
    },
    {
      name: 'Contact Info',
      description: 'Update contact details and social links',
      icon: <Mail className="h-6 w-6" />,
      path: '/admin/contact',
      color: 'from-red-500 to-pink-500',
      stats: 'Active',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary via-primary-light to-primary rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome to Admin Dashboard</h1>
            <p className="text-blue-100 text-lg">
              Manage your website content and settings from here
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <TrendingUp className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Firebase Data Migration */}
      <DataMigrationButton />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Content Items</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">52</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2 flex items-center">
            <TrendingUp className="h-4 w-4 mr-1" />
            Active and published
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Gallery Images</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">24</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Image className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Across all categories
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Sections</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">7</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Star className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Manageable sections
          </p>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${link.color} text-white`}>
                  {link.icon}
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{link.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{link.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {link.stats}
                </span>
                <span className="text-sm text-primary font-medium group-hover:underline">
                  Manage →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="p-2 bg-green-100 rounded-lg">
              <Image className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Gallery updated</p>
              <p className="text-xs text-gray-600">3 new images added to classroom category</p>
            </div>
            <span className="text-xs text-gray-500">2 hours ago</span>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Quote className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Testimonial added</p>
              <p className="text-xs text-gray-600">New student review published</p>
            </div>
            <span className="text-xs text-gray-500">5 hours ago</span>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BookOpen className="h-5 w-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Course updated</p>
              <p className="text-xs text-gray-600">Academic IELTS pricing changed</p>
            </div>
            <span className="text-xs text-gray-500">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
