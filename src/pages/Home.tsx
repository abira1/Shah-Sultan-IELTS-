import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import { ArrowRight, Award, BookOpen, Clock, Star, Users, BarChart, MessageCircle, CalendarCheck, Trophy, ChevronRight, Loader2 } from 'lucide-react';
import TestimonialCarousel from '../components/sections/TestimonialCarousel';
import Gallery from '../components/sections/Gallery';
import ContactSection from '../components/sections/ContactSection';
import BadgeIndianRupee from '../components/ui/BadgeIndianRupee';
import Check from '../components/ui/Check';
import { useEnrollment } from '../contexts/EnrollmentContext';
import { featureService } from '../services/featureService';
import { courseService } from '../services/courseService';
import { testimonialService } from '../services/testimonialService';
import { Feature } from '../models/Feature';
import { Course } from '../models/Course';
import { Testimonial } from '../models/Testimonial';

const HomePage: React.FC = () => {
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const { openEnrollmentModal } = useEnrollment();
  
  // Features state
  const [features, setFeatures] = useState<Feature[]>([]);
  const [featuresLoading, setFeaturesLoading] = useState(true);
  
  // Courses state
  const [courses, setCourses] = useState<Course[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  
  // Testimonials state
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);

  // Fetch features from Firebase with real-time updates
  useEffect(() => {
    const unsubscribe = featureService.subscribe((data) => {
      if (data) {
        const featuresArray = data.filter(f => f.isActive);
        setFeatures(featuresArray);
      }
      setFeaturesLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch courses from Firebase with real-time updates (limit to 3)
  useEffect(() => {
    const unsubscribe = courseService.subscribe((data) => {
      if (data) {
        const coursesArray = data
          .filter(c => c.isActive)
          .slice(0, 3); // Show only 3 courses on home page
        setCourses(coursesArray);
      }
      setCoursesLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch testimonials from Firebase with real-time updates
  useEffect(() => {
    const unsubscribe = testimonialService.subscribe((data) => {
      if (data) {
        const testimonialsArray = data.filter(t => t.isActive);
        setTestimonials(testimonialsArray);
      }
      setTestimonialsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return <div>
      {/* Hero Section - Redesigned to match Figma */}
      <section className="bg-primary py-20 sm:py-24 md:py-32 lg:py-40 relative">
        <div className="container px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="w-full md:max-w-3xl text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 sm:mb-10">
                  Your <span className="text-accent">trusted destination</span>{' '}
                  for
                  <br className="hidden md:block" /> mastering English and
                  <br className="hidden md:block" /> achieving the IELTS goals
                </h1>
                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center md:justify-start gap-4 mt-6 sm:mt-8">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    onClick={() => openEnrollmentModal()} 
                    className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium shadow-lg w-full sm:w-auto"
                    data-testid="hero-register-button"
                  >
                    Register Now
                  </Button>
                  <Button variant="outline" size="lg" to="/courses" className="border-white/30 bg-primary text-white hover:bg-white/10 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium w-full sm:w-auto">
                    Explore Courses
                  </Button>
                </div>
              </div>
              <div className="mt-8 md:mt-0">
                <img src="/image-removebg-preview.png" alt="Award Winning Academy" className="h-24 sm:h-28 md:h-32 lg:h-40 w-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Why Choose Shah Sultan's IELTS Academy
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto px-4 sm:px-0">
              At Shah Sultan's IELTS Academy, students receive more than just
              exam preparation—they gain confidence, practical skills, and
              personalized guidance.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {featuresLoading ? (
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-center py-12">
                <Loader2 className="animate-spin h-8 w-8 text-primary" />
              </div>
            ) : features.length > 0 ? (
              features.map((feature) => (
                <div key={feature.id} className="p-4 sm:p-6 bg-secondary rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary text-sm sm:text-base">
                    {feature.description}
                  </p>
                </div>
              ))
            ) : (
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-12 text-gray-500">
                <p>No features available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-16 bg-secondary">
        <div className="container px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                About Shah Sultan's IELTS Academy
              </h2>
              <div>
                <p className="text-text-secondary mb-4 sm:mb-6 text-sm sm:text-base">
                  Founded by dedicated educator Md. Shah Sultan, our academy
                  combines expert-led classes, hands-on practice, and tailored
                  study materials to ensure students are well-prepared for both
                  Academic and General Training IELTS.
                </p>
                <p className="text-text-secondary mb-4 sm:mb-6 text-sm sm:text-base">
                  Our academy focuses on developing all four skills required for
                  IELTS success: listening, reading, writing, and speaking. With
                  small-group sessions, computer-based practice, mock tests, and
                  spoken English support, we've become a trusted name in Sylhet
                  for transforming learners' English proficiency into real
                  success.
                </p>
                <p className="text-text-secondary mb-4 sm:mb-6 text-sm sm:text-base">
                  We take pride in our students' achievements - from beginners
                  building confidence in spoken English to advanced learners
                  securing band scores of 6.0–7.5. Our social media platforms
                  are filled with heartfelt testimonials from students who
                  reached their goals through our focused training.
                </p>
                <p className="text-text-secondary mb-4 sm:mb-6 text-sm sm:text-base">
                  Over the years, we've gained recognition within the community
                  as one of Sylhet's leading IELTS training centers. The visit
                  of the British Council's Country Exams Director, Maxim
                  Raimann, reflects our growing prestige. With glowing reviews,
                  a 4.8/5 average rating, and a strong social media following of
                  over 29,000 people, we continue to stand out as a reliable,
                  results-driven institute.
                </p>
                <div className="flex flex-wrap gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div>
                    <p className="text-2xl sm:text-3xl font-bold text-accent">
                      5000+
                    </p>
                    <p className="text-xs sm:text-sm text-text-secondary">
                      Successful Students
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-bold text-accent">
                      4.8/5
                    </p>
                    <p className="text-xs sm:text-sm text-text-secondary">
                      Average Rating
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-bold text-accent">
                      29K+
                    </p>
                    <p className="text-xs sm:text-sm text-text-secondary">
                      Social Media Following
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-bold text-accent">
                      7.5
                    </p>
                    <p className="text-xs sm:text-sm text-text-secondary">
                      Highest Band Score
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button variant="primary" to="/about" className="focus:ring-offset-secondary w-full sm:w-auto">
                  Learn More About Us
                </Button>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img src="https://i.postimg.cc/SsvCP6tF/480479123-122187622418126286-254834324271260339-n.jpg" alt="Students studying at Shah Sultan's IELTS Academy" className="rounded-lg shadow-lg w-full h-auto object-cover" />
                <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 bg-accent p-3 sm:p-4 rounded-lg shadow-lg">
                  <p className="text-white font-bold text-lg sm:text-xl">
                    British Council
                  </p>
                  <p className="text-white text-xs sm:text-sm">Recognized</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Preview Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Our IELTS Preparation Courses
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Choose from our range of specialized courses designed to meet your
              specific needs and goals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {coursesLoading ? (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center py-12">
                <Loader2 className="animate-spin h-8 w-8 text-primary" />
              </div>
            ) : courses.length > 0 ? (
              courses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={course.image || 'https://i.postimg.cc/909RNv7Z/531659237-122207766008126286-7972825840697671255-n.jpg'} 
                      alt={`${course.title} Course`} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-primary/60 flex items-center justify-center">
                      <span className="text-3xl sm:text-4xl font-bold text-white">
                        {course.title}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-primary">
                      {course.title}
                    </h3>
                    <p className="text-text-secondary mb-4 text-sm sm:text-base">
                      {course.description}
                    </p>
                    <div className="flex items-center bg-accent/10 p-2 rounded-lg mb-4">
                      <span className="text-accent font-semibold">
                        {course.fee.startsWith('৳') ? course.fee : `৳ ${course.fee}`}
                      </span>
                    </div>
                    {course.features && course.features.length > 0 && (
                      <ul className="space-y-2 mb-6 text-sm sm:text-base">
                        {course.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <Check className="h-4 w-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-text-secondary text-sm">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {course.duration && (
                      <p className="text-sm text-text-secondary mb-4">
                        <Clock className="inline h-4 w-4 mr-1" />
                        Duration: {course.duration}
                      </p>
                    )}
                    <Button 
                      variant="outline" 
                      fullWidth 
                      onClick={() => openEnrollmentModal(course.id)}
                      data-testid={`home-course-${course.id}-button`}
                    >
                      Enroll Now
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12 text-gray-500">
                <p>No courses available at the moment. Check back soon!</p>
              </div>
            )}
          </div>
          <div className="text-center mt-8 sm:mt-12">
            <Button variant="secondary" to="/courses">
              View All Courses
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-20 bg-secondary relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-40 sm:w-64 h-40 sm:h-64 bg-primary opacity-5 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-24 sm:w-40 h-24 sm:h-40 bg-accent opacity-5 rounded-full"></div>
        <div className="container relative z-10 px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-accent font-medium px-3 sm:px-4 py-1 bg-accent/10 rounded-full mb-3 sm:mb-4 inline-block text-xs sm:text-sm">
              TESTIMONIALS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              Success Stories
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto text-sm sm:text-base">
              From beginners building confidence to advanced learners securing
              band scores of 6.0–7.5, every success is celebrated at Shah
              Sultan's IELTS Academy.
            </p>
          </div>
          {/* Grid of testimonial cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {testimonialsLoading ? (
              <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 flex justify-center py-12">
                <Loader2 className="animate-spin h-8 w-8 text-primary" />
              </div>
            ) : testimonials.length > 0 ? (
              testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white border-2 border-primary p-3 shadow-[4px_4px_0px_0px_rgba(10,42,102,1)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(10,42,102,1)]">
                  <div className="relative mb-3 h-48 overflow-hidden">
                    <img 
                      src={testimonial.image || 'https://i.postimg.cc/K8xkJpv3/536268281-122208266720126286-7708938899969929883-n.jpg'} 
                      alt={testimonial.name} 
                      className="object-cover w-full h-full" 
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-primary/90 text-white p-2">
                      <p className="font-bold text-sm">{testimonial.name}</p>
                      <p className="text-xs">Band Score: {testimonial.band}</p>
                    </div>
                  </div>
                  <p className="text-sm italic">
                    "{testimonial.comment}"
                  </p>
                </div>
              ))
            ) : (
              <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 text-center py-12 text-gray-500">
                <p>No testimonials available yet.</p>
              </div>
            )}
          </div>
          <div className="text-center mt-8 sm:mt-12">
            <a href="/testimonials" className="inline-flex items-center text-primary font-medium hover:text-accent transition-colors text-sm sm:text-base">
              View more success stories
              <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Academy Gallery
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto text-sm sm:text-base">
              Take a look at our modern facilities, engaging classes, and
              student activities.
            </p>
          </div>
          <Gallery />
          <div className="text-center mt-6 sm:mt-8">
            <Button variant="outline" to="/gallery">
              View Full Gallery
            </Button>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-12 sm:py-16 bg-secondary">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Achievements & Recognition
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto text-sm sm:text-base">
              Over the years, we've gained recognition as one of Sylhet's
              leading IELTS training centers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Trophy className="h-6 w-6 text-accent mr-2" />
                British Council Recognition
              </h3>
              <p className="text-text-secondary mb-4">
                The visit of the British Council's Country Exams Director, Maxim
                Raimann, reflects our growing prestige in the IELTS preparation
                community.
              </p>
              <div className="flex items-center justify-center bg-secondary/30 rounded-lg p-4">
                <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="British Council Visit" className="rounded-lg max-h-48" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Award className="h-6 w-6 text-accent mr-2" />
                Community Impact
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">4.8/5 Average Rating</p>
                    <p className="text-text-secondary text-sm">
                      Based on student feedback and reviews
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">
                      29,000+ Social Media Following
                    </p>
                    <p className="text-text-secondary text-sm">
                      Engaged community across Facebook and Instagram
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <BarChart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">High Success Rate</p>
                    <p className="text-text-secondary text-sm">
                      Most students achieve their target band scores
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <CalendarCheck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Leading Training Center</p>
                    <p className="text-text-secondary text-sm">
                      Recognized as one of Sylhet's top IELTS institutes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-primary">
        <div className="container px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
              Ready to Achieve Your IELTS Goals?
            </h2>
            <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8">
              Join Shah Sultan's IELTS Academy today and take the first step
              towards your international education or career.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                variant="primary" 
                size="lg" 
                onClick={() => openEnrollmentModal()} 
                className="w-full sm:w-auto"
                data-testid="cta-register-button"
              >
                Register Now
              </Button>
              <Button variant="outline" size="lg" to="/contact" className="border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </div>;
};
export default HomePage;