import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Check, Clock, Calendar, MapPin, Phone, Loader2 } from 'lucide-react';
import { useEnrollment } from '../contexts/EnrollmentContext';
import { CourseCategory } from '../data/courses';
import { BookOpen, GraduationCap, FileText, Users } from 'lucide-react';
import { courseService } from '../services/courseService';
import { Course } from '../models/Course';

const CoursesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CourseCategory>('all');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const { openEnrollmentModal } = useEnrollment();
  const navigate = useNavigate();
  
  // Courses state
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch courses from Firebase with real-time updates
  useEffect(() => {
    const unsubscribe = courseService.subscribe((data) => {
      if (data) {
        const coursesArray = data.filter(c => c.isActive);
        setCourses(coursesArray);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  
  const handleEnroll = (courseId: string) => {
    openEnrollmentModal(courseId);
  };
  
  const toggleCardExpansion = (courseId: string) => {
    setExpandedCard(expandedCard === courseId ? null : courseId);
  };

  const filteredCourses = activeCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === activeCategory);
  
  const categoryIcons = {
    all: <BookOpen className="h-5 w-5" />,
    'full-courses': <GraduationCap className="h-5 w-5" />,
    'practice-tests': <FileText className="h-5 w-5" />,
    specialized: <Users className="h-5 w-5" />
  };
  
  const categoryLabels = {
    all: 'All Courses',
    'full-courses': 'Full Courses',
    'practice-tests': 'Practice Tests & Workshops',
    specialized: 'Specialized Programs'
  };
  
  return (
    <div className="bg-secondary min-h-screen">
      <div className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Our IELTS Preparation Courses
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Choose from our specialized IELTS preparation courses designed to
            help you achieve your target band score and meet your academic or
            professional goals.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {(Object.keys(categoryLabels) as CourseCategory[]).map(category => (
            <button 
              key={category} 
              onClick={() => setActiveCategory(category)} 
              className={`flex items-center px-4 py-2 rounded-full transition-all ${activeCategory === category ? 'bg-primary text-white shadow-md' : 'bg-white text-text-secondary hover:bg-gray-100'}`}
            >
              <span className="mr-2">{categoryIcons[category]}</span>
              {categoryLabels[category]}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin h-12 w-12 text-primary" />
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No Courses Available
              </h3>
              <p className="text-text-secondary">
                {activeCategory === 'all' 
                  ? 'No courses have been added yet. Please check back soon!'
                  : `No courses found in the "${categoryLabels[activeCategory]}" category.`
                }
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => {
            const rotations = ['-rotate-[1deg]', 'rotate-[1deg]', '-rotate-[0.5deg]', 'rotate-[0.5deg]', '-rotate-[1.5deg]', 'rotate-[1.5deg]'];
            const rotation = rotations[index % rotations.length];
            const isExpanded = expandedCard === course.id;
            
            return (
              <div 
                key={course.id} 
                className={`relative bg-white border-2 border-primary p-2 shadow-[4px_4px_0px_0px_rgba(10,42,102,1)] transition-all duration-500 ease-in-out ${
                  isExpanded 
                    ? 'md:col-span-2 lg:col-span-3 shadow-[8px_8px_0px_0px_rgba(10,42,102,1)]' 
                    : 'hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(10,42,102,1)]'
                } ${rotation}`}
              >
                {/* Corner badges */}
                {course.popular && (
                  <div className="absolute -top-3 -right-3 bg-accent text-white text-xs font-bold px-3 py-1.5 rotate-6 border-2 border-primary shadow-md z-10">
                    MOST POPULAR
                  </div>
                )}
                <div className="absolute -top-3 -left-3 bg-primary text-white text-xs font-bold px-2 py-1 rotate-[-6deg] border-2 border-accent shadow-sm z-10">
                  {categoryLabels[course.category].toUpperCase()}
                </div>
                
                <div className={`${isExpanded ? 'md:flex md:gap-4' : ''}`}>
                  {/* Image Section */}
                  <div className={`overflow-hidden relative ${isExpanded ? 'md:w-1/3 lg:w-1/4' : ''}`}>
                    <img 
                      src={course.image} 
                      alt={`${course.title} course`} 
                      className={`w-full object-cover transition-all duration-500 ${
                        isExpanded ? 'h-64 md:h-full' : 'h-48'
                      }`}
                    />
                  </div>
                  
                  {/* Content Section */}
                  <div className={`p-4 ${isExpanded ? 'md:flex-1' : ''}`}>
                    {/* Compact View - Always Visible */}
                    <div>
                      <h2 className="text-lg md:text-xl font-bold mb-1 text-primary">
                        {course.title}
                      </h2>
                      <p className={`text-text-secondary text-sm mb-3 ${isExpanded ? '' : 'line-clamp-2'}`}>
                        {course.description}
                      </p>
                    </div>
                    
                    {/* Expanded Details - Conditionally Rendered */}
                    {isExpanded && (
                      <div className="space-y-4 transition-all duration-500 ease-in-out">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {course.duration && (
                            <div className="flex items-center bg-secondary/30 p-2 rounded">
                              <Clock className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                              <span className="text-text-secondary text-sm font-medium">
                                {course.duration}
                              </span>
                            </div>
                          )}
                          {course.schedule && (
                            <div className="flex items-center bg-secondary/30 p-2 rounded">
                              <Calendar className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                              <span className="text-text-secondary text-sm font-medium">
                                {course.schedule}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {course.features && course.features.length > 0 && (
                          <div>
                            <h3 className="text-sm font-bold mb-2 text-primary uppercase">Course Highlights</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {course.features.map((item, idx) => (
                                <li key={idx} className="flex items-start">
                                  <Check className="h-4 w-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-text-secondary text-sm">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {(course.location || course.contact) && (
                          <div className="bg-secondary/20 p-3 rounded border border-primary/20">
                            {course.location && (
                              <div className="flex items-start mb-2">
                                <MapPin className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-text-secondary">
                                  {course.location}
                                </span>
                              </div>
                            )}
                            {course.contact && (
                              <div className="flex items-start">
                                <Phone className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-text-secondary">
                                  {course.contact}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Gallery-style footer */}
                <div className="bg-primary text-white p-3 mt-2 border-t-2 border-primary">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold">
                      ৳ {course.fee.replace('৳', '')} Taka
                    </span>
                    {!isExpanded && (
                      <span className="text-xs opacity-80 uppercase tracking-wide">
                        Quick View
                      </span>
                    )}
                  </div>
                  
                  {isExpanded ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEnroll(course.id)} 
                        aria-label={`Enroll in ${course.title} course`} 
                        className="flex-1 text-sm py-3 bg-accent text-white hover:bg-accent-dark border-2 border-accent font-bold shadow-lg transform hover:scale-105 transition-all uppercase tracking-wide"
                        data-testid={`enroll-${course.id}-button`}
                      >
                        ENROLL NOW →
                      </button>
                      <button
                        onClick={() => toggleCardExpansion(course.id)}
                        className="px-6 py-3 bg-white text-primary text-sm font-bold hover:bg-gray-100 transition-colors border-2 border-white shadow-md uppercase"
                      >
                        CLOSE
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => toggleCardExpansion(course.id)}
                      className="w-full py-2 bg-white text-primary text-sm font-bold hover:bg-accent hover:text-white transition-colors border-2 border-white"
                      data-testid={`view-details-${course.id}-button`}
                    >
                      VIEW DETAILS →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          </div>
        )}
        
        {/* Retro-styled decorative elements */}
        <div className="flex justify-center mt-12">
          <div className="w-24 h-1 bg-primary mx-2"></div>
          <div className="w-4 h-4 bg-accent rotate-45 transform -translate-y-1.5"></div>
          <div className="w-24 h-1 bg-primary mx-2"></div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
