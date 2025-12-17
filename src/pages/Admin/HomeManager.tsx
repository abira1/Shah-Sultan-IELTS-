import React, { useState } from 'react';
import { 
  Home, 
  Edit, 
  Save,
  Plus,
  Trash2,
  Image,
  Star,
  Quote,
  Award,
  BookOpen,
  Globe,
  X,
  Check,
  AlertCircle
} from 'lucide-react';

interface HomeSection {
  id: string;
  name: string;
  type: 'hero' | 'features' | 'courses' | 'testimonials' | 'gallery' | 'stats' | 'contact';
  isActive: boolean;
  content: any;
  lastUpdated: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  features: string[];
  isActive: boolean;
}

interface Testimonial {
  id: string;
  name: string;
  band: number;
  comment: string;
  image: string;
  course: string;
  date: string;
  isActive: boolean;
}

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
}

interface GalleryImage {
  id: string;
  title: string;
  description: string;
  url: string;
  category: 'classroom' | 'events' | 'achievements' | 'facilities';
  isActive: boolean;
}

const HomeManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'courses' | 'testimonials' | 'gallery' | 'hero'>('overview');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editingType, setEditingType] = useState<string>('');

  // Home sections data
  const [sections, setSections] = useState<HomeSection[]>([
    {
      id: '1',
      name: 'Hero Section',
      type: 'hero',
      isActive: true,
      content: {
        title: 'Master IELTS with Expert Guidance',
        subtitle: 'Achieve your target band score with our proven teaching methods',
        buttonText: 'Start Your Journey',
        backgroundImage: '/images/hero-bg.jpg'
      },
      lastUpdated: '2025-09-15'
    },
    {
      id: '2',
      name: 'Courses Section',
      type: 'courses',
      isActive: true,
      content: {
        title: 'Our Courses',
        subtitle: 'Choose the perfect course for your IELTS preparation'
      },
      lastUpdated: '2025-09-14'
    },
    {
      id: '3',
      name: 'Testimonials',
      type: 'testimonials',
      isActive: true,
      content: {
        title: 'Success Stories',
        subtitle: 'What our students say about their journey'
      },
      lastUpdated: '2025-09-13'
    },
    {
      id: '4',
      name: 'Gallery',
      type: 'gallery',
      isActive: true,
      content: {
        title: 'Our Learning Environment',
        subtitle: 'Explore our modern facilities and vibrant community'
      },
      lastUpdated: '2025-09-12'
    }
  ]);

  // Courses data
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'Academic IELTS',
      description: 'Comprehensive preparation for Academic IELTS with focus on all four skills',
      price: 15000,
      duration: '3 months',
      image: '/images/academic-ielts.jpg',
      features: ['Speaking Practice', 'Writing Feedback', 'Reading Strategies', 'Listening Skills'],
      isActive: true
    },
    {
      id: '2',
      title: 'General IELTS',
      description: 'Complete General IELTS preparation for immigration and work purposes',
      price: 12000,
      duration: '2 months',
      image: '/images/general-ielts.jpg',
      features: ['Task-specific Training', 'Band Score Improvement', 'Mock Tests', 'Expert Guidance'],
      isActive: true
    },
    {
      id: '3',
      title: 'Speaking Workshop',
      description: 'Intensive speaking practice with native-like fluency development',
      price: 8000,
      duration: '1 month',
      image: '/images/speaking-workshop.jpg',
      features: ['Pronunciation Training', 'Confidence Building', 'Interview Practice', 'Accent Reduction'],
      isActive: true
    }
  ]);

  // Features data
  const [features, setFeatures] = useState<Feature[]>([
    {
      id: '1',
      title: 'Expert Instructors',
      description: 'Learn from certified IELTS trainers with years of experience',
      icon: 'Award',
      isActive: true
    },
    {
      id: '2',
      title: 'Flexible Scheduling',
      description: 'Choose from morning, evening, and weekend batch options',
      icon: 'Clock',
      isActive: true
    },
    {
      id: '3',
      title: 'Personal Attention',
      description: 'Small batch sizes ensure individual focus and guidance',
      icon: 'Users',
      isActive: true
    },
    {
      id: '4',
      title: 'Mock Tests',
      description: 'Regular practice tests with detailed performance analysis',
      icon: 'FileText',
      isActive: true
    },
    {
      id: '5',
      title: 'Study Materials',
      description: 'Comprehensive books and online resources included',
      icon: 'BookOpen',
      isActive: true
    },
    {
      id: '6',
      title: 'Speaking Practice',
      description: 'Daily speaking sessions with native speakers and AI tools',
      icon: 'Mic',
      isActive: true
    }
  ]);

  // Testimonials data
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: '1',
      name: 'Sarah Ahmed',
      band: 8.0,
      comment: 'The teaching methodology here is exceptional. I achieved my target band score in just 3 months!',
      image: '/images/testimonial-1.jpg',
      course: 'Academic IELTS',
      date: '2025-08-15',
      isActive: true
    },
    {
      id: '2',
      name: 'Mohammad Rahman',
      band: 7.5,
      comment: 'Excellent teachers and comprehensive study materials. Highly recommended for IELTS preparation.',
      image: '/images/testimonial-2.jpg',
      course: 'General IELTS',
      date: '2025-08-10',
      isActive: true
    },
    {
      id: '3',
      name: 'Fatima Khan',
      band: 7.0,
      comment: 'The speaking workshop transformed my confidence. Now I speak English fluently!',
      image: '/images/testimonial-3.jpg',
      course: 'Speaking Workshop',
      date: '2025-08-05',
      isActive: true
    }
  ]);

  // Gallery data
  const [gallery, setGallery] = useState<GalleryImage[]>([
    {
      id: '1',
      title: 'Modern Classroom',
      description: 'State-of-the-art classroom with latest technology',
      url: '/images/classroom-1.jpg',
      category: 'classroom',
      isActive: true
    },
    {
      id: '2',
      title: 'Group Discussion',
      description: 'Students engaging in interactive speaking sessions',
      url: '/images/classroom-2.jpg',
      category: 'classroom',
      isActive: true
    },
    {
      id: '3',
      title: 'Achievement Ceremony',
      description: 'Celebrating student success stories',
      url: '/images/achievement-1.jpg',
      category: 'achievements',
      isActive: true
    },
    {
      id: '4',
      title: 'Study Area',
      description: 'Comfortable study environment for focused learning',
      url: '/images/facility-1.jpg',
      category: 'facilities',
      isActive: true
    }
  ]);

  const handleEditSection = (section: HomeSection) => {
    setEditingItem(section);
    setEditingType('section');
    setShowEditModal(true);
  };

  const handleEditCourse = (course: Course) => {
    setEditingItem(course);
    setEditingType('course');
    setShowEditModal(true);
  };

  const handleEditTestimonial = (testimonial: Testimonial) => {
    setEditingItem(testimonial);
    setEditingType('testimonial');
    setShowEditModal(true);
  };

  const handleEditGallery = (image: GalleryImage) => {
    setEditingItem(image);
    setEditingType('gallery');
    setShowEditModal(true);
  };

  const handleEditFeature = (feature: Feature) => {
    setEditingItem(feature);
    setEditingType('feature');
    setShowEditModal(true);
  };

  const handleToggleActive = (type: string, id: string) => {
    switch (type) {
      case 'course':
        setCourses(courses.map(course => 
          course.id === id ? { ...course, isActive: !course.isActive } : course
        ));
        break;
      case 'feature':
        setFeatures(features.map(feature => 
          feature.id === id ? { ...feature, isActive: !feature.isActive } : feature
        ));
        break;
      case 'testimonial':
        setTestimonials(testimonials.map(testimonial => 
          testimonial.id === id ? { ...testimonial, isActive: !testimonial.isActive } : testimonial
        ));
        break;
      case 'gallery':
        setGallery(gallery.map(image => 
          image.id === id ? { ...image, isActive: !image.isActive } : image
        ));
        break;
      case 'section':
        setSections(sections.map(section => 
          section.id === id ? { ...section, isActive: !section.isActive } : section
        ));
        break;
    }
  };

  const handleDelete = (type: string, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    switch (type) {
      case 'course':
        setCourses(courses.filter(course => course.id !== id));
        break;
      case 'feature':
        setFeatures(features.filter(feature => feature.id !== id));
        break;
      case 'testimonial':
        setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
        break;
      case 'gallery':
        setGallery(gallery.filter(image => image.id !== id));
        break;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Active Courses</p>
              <p className="text-2xl font-bold text-gray-900">{courses.filter(c => c.isActive).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Star className="h-5 w-5 text-orange-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Features</p>
              <p className="text-2xl font-bold text-gray-900">{features.filter(f => f.isActive).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Quote className="h-5 w-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Testimonials</p>
              <p className="text-2xl font-bold text-gray-900">{testimonials.filter(t => t.isActive).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Image className="h-5 w-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Gallery Images</p>
              <p className="text-2xl font-bold text-gray-900">{gallery.filter(g => g.isActive).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Globe className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Active Sections</p>
              <p className="text-2xl font-bold text-gray-900">{sections.filter(s => s.isActive).length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Home Page Sections</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {sections.map((section) => (
            <div key={section.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-gray-900">{section.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      section.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {section.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Type: {section.type}</p>
                  <p className="text-sm text-gray-500">Last updated: {section.lastUpdated}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleActive('section', section.id)}
                    className={`p-2 rounded-lg ${
                      section.isActive 
                        ? 'text-red-600 hover:bg-red-50' 
                        : 'text-green-600 hover:bg-green-50'
                    }`}
                    title={section.isActive ? 'Deactivate' : 'Activate'}
                  >
                    {section.isActive ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => handleEditSection(section)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    title="Edit Section"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Manage Courses</h2>
        <button
          onClick={() => {
            setEditingItem(null);
            setEditingType('course');
            setShowEditModal(true);
          }}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="relative">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop';
                }}
              />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  course.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {course.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{course.description}</p>
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-primary">৳{course.price}</span>
                <span className="text-sm text-gray-500">{course.duration}</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-4">
                {course.features.slice(0, 2).map((feature, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                    {feature}
                  </span>
                ))}
                {course.features.length > 2 && (
                  <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded">
                    +{course.features.length - 2} more
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleActive('course', course.id)}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium ${
                    course.isActive 
                      ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {course.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  onClick={() => handleEditCourse(course)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  title="Edit Course"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete('course', course.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  title="Delete Course"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFeatures = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Manage Features</h2>
        <button
          onClick={() => {
            setEditingItem(null);
            setEditingType('feature');
            setShowEditModal(true);
          }}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Feature
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div key={feature.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <Star className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium mt-1 ${
                    feature.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {feature.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleToggleActive('feature', feature.id)}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium ${
                  feature.isActive 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {feature.isActive ? 'Deactivate' : 'Activate'}
              </button>
              <button
                onClick={() => handleEditFeature(feature)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                title="Edit Feature"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete('feature', feature.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                title="Delete Feature"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTestimonials = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Manage Testimonials</h2>
        <button
          onClick={() => {
            setEditingItem(null);
            setEditingType('testimonial');
            setShowEditModal(true);
          }}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="divide-y divide-gray-100">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start gap-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=0a2a66&color=fff`;
                  }}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-gray-900">{testimonial.name}</h3>
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium text-gray-900">Band {testimonial.band}</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      testimonial.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {testimonial.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{testimonial.comment}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Course: {testimonial.course}</span>
                    <span>Date: {testimonial.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleActive('testimonial', testimonial.id)}
                    className={`p-2 rounded-lg ${
                      testimonial.isActive 
                        ? 'text-red-600 hover:bg-red-50' 
                        : 'text-green-600 hover:bg-green-50'
                    }`}
                    title={testimonial.isActive ? 'Deactivate' : 'Activate'}
                  >
                    {testimonial.isActive ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => handleEditTestimonial(testimonial)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    title="Edit Testimonial"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete('testimonial', testimonial.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    title="Delete Testimonial"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGallery = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Manage Gallery</h2>
        <button
          onClick={() => {
            setEditingItem(null);
            setEditingType('gallery');
            setShowEditModal(true);
          }}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Image
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {gallery.map((image) => (
          <div key={image.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="relative">
              <img 
                src={image.url} 
                alt={image.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop';
                }}
              />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  image.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {image.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="absolute top-2 left-2">
                <span className="px-2 py-1 bg-black bg-opacity-50 text-white rounded text-xs">
                  {image.category}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-1">{image.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{image.description}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleActive('gallery', image.id)}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium ${
                    image.isActive 
                      ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {image.isActive ? 'Hide' : 'Show'}
                </button>
                <button
                  onClick={() => handleEditGallery(image)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  title="Edit Image"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete('gallery', image.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  title="Delete Image"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Home className="h-6 w-6 mr-2 text-primary" />
              Home Page Manager
            </h1>
            <p className="text-gray-600 mt-1">Control all sections and content on the home page</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="border-b border-gray-100">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { id: 'overview', name: 'Overview', icon: Globe },
              { id: 'features', name: 'Features', icon: Star },
              { id: 'courses', name: 'Courses', icon: BookOpen },
              { id: 'testimonials', name: 'Testimonials', icon: Quote },
              { id: 'gallery', name: 'Gallery', icon: Image },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'features' && renderFeatures()}
          {activeTab === 'courses' && renderCourses()}
          {activeTab === 'testimonials' && renderTestimonials()}
          {activeTab === 'gallery' && renderGallery()}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingItem ? `Edit ${editingType}` : `Add New ${editingType}`}
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <p className="text-sm text-blue-800">
                    This is a demo interface. In a real application, you would have forms to edit the content.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-600">
                  Editing functionality would include:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Rich text editor for content</li>
                  <li>Image upload and management</li>
                  <li>Form validation</li>
                  <li>Preview functionality</li>
                  <li>SEO optimization fields</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeManager;