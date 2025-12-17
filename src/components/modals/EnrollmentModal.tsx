import React, { useState, useEffect } from 'react';
import { X, User, Phone, Mail, Building, BookOpen, CheckCircle } from 'lucide-react';
import { generateWhatsAppURL, formatEnrollmentMessage, EnrollmentData } from '../../utils/whatsapp';
import Button from '../ui/Button';

interface Course {
  id: string;
  title: string;
}

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  selectedCourseId?: string;
}

const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  courses,
  selectedCourseId
}) => {
  const [formData, setFormData] = useState<EnrollmentData>({
    name: '',
    phone: '',
    email: '',
    institute: '',
    course: selectedCourseId || 'not-decided'
  });

  const [errors, setErrors] = useState<Partial<Record<keyof EnrollmentData, string>>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        phone: '',
        email: '',
        institute: '',
        course: selectedCourseId || 'not-decided'
      });
      setErrors({});
      setShowSuccess(false);
    }
  }, [isOpen, selectedCourseId]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof EnrollmentData, string>> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Course validation
    if (!formData.course) {
      newErrors.course = 'Please select a course';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Get course title
    const courseTitle = formData.course === 'not-decided'
      ? 'Not Decided Yet'
      : courses.find(c => c.id === formData.course)?.title || 'Unknown Course';

    // Create enrollment data with course title
    const enrollmentData: EnrollmentData = {
      ...formData,
      course: courseTitle
    };

    // Format message and generate WhatsApp URL
    const message = formatEnrollmentMessage(enrollmentData);
    const whatsappURL = generateWhatsAppURL('+8801777476142', message);

    // Show success message
    setShowSuccess(true);

    // Wait a moment to show success, then redirect
    setTimeout(() => {
      window.open(whatsappURL, '_blank');
      setIsSubmitting(false);
      
      // Close modal after a short delay
      setTimeout(() => {
        onClose();
      }, 1500);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof EnrollmentData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !showSuccess) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm
                 animate-fadeIn"
      onClick={handleBackdropClick}
      data-testid="enrollment-modal-backdrop"
    >
      {/* Success Message Overlay */}
      {showSuccess && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black bg-opacity-30">
          <div className="bg-white rounded-2xl p-8 shadow-2xl animate-scaleIn max-w-sm mx-4" data-testid="success-message">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Success!</h3>
              <p className="text-gray-600">Redirecting to WhatsApp...</p>
            </div>
          </div>
        </div>
      )}

      {/* Modal Container */}
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden
                   md:animate-modalScaleIn
                   animate-modalSlideUp"
        onClick={(e) => e.stopPropagation()}
        data-testid="enrollment-modal"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/90 px-6 py-5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white" id="enrollment-modal-title">
              Enroll Now
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              aria-label="Close modal"
              disabled={isSubmitting}
              data-testid="close-modal-button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-white/90 text-sm mt-1">Fill in your details to get started</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all
                  ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter your full name"
                disabled={isSubmitting}
                data-testid="name-input"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs mt-1" data-testid="name-error">{errors.name}</p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all
                  ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter your phone number"
                disabled={isSubmitting}
                data-testid="phone-input"
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1" data-testid="phone-error">{errors.phone}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all
                  ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter your email address"
                disabled={isSubmitting}
                data-testid="email-input"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1" data-testid="email-error">{errors.email}</p>
            )}
          </div>

          {/* Institute Field (Optional) */}
          <div>
            <label htmlFor="institute" className="block text-sm font-medium text-gray-700 mb-2">
              Institute <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                id="institute"
                name="institute"
                value={formData.institute}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                placeholder="Enter your institute name"
                disabled={isSubmitting}
                data-testid="institute-input"
              />
            </div>
          </div>

          {/* Course Selection */}
          <div>
            <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">
              Course Selection <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all appearance-none bg-white cursor-pointer
                  ${errors.course ? 'border-red-500' : 'border-gray-300'}`}
                disabled={isSubmitting}
                data-testid="course-select"
              >
                <option value="not-decided">Not Decided</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.course && (
              <p className="text-red-500 text-xs mt-1" data-testid="course-error">{errors.course}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-primary to-primary/90 text-white font-semibold py-3.5 px-6 rounded-lg
                         hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]
                         transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                         focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
              data-testid="confirm-enrollment-button"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Confirm Enrollment'
              )}
            </button>
          </div>
        </form>

        {/* Footer Note */}
        <div className="px-6 pb-6 pt-2">
          <p className="text-xs text-center text-gray-500">
            By enrolling, you'll be redirected to WhatsApp to complete your registration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentModal;