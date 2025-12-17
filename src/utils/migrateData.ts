import { setData } from '../firebase/database';
import { courses } from '../data/courses';

/**
 * Migration script to populate Firebase with initial data
 * Run this once to set up the database
 */

// Sample testimonials data
const testimonials = [
  {
    id: 'testimonial_1',
    name: 'Ahmed Rahman',
    band: 8.0,
    comment: "Shah Sultan's IELTS Academy helped me achieve my dream score! The teachers are exceptional.",
    image: 'https://i.pravatar.cc/150?img=1',
    course: 'IELTS Main Course',
    date: '2024-01-15',
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'testimonial_2',
    name: 'Fatima Begum',
    band: 7.5,
    comment: 'The mock tests and feedback were invaluable. I improved my band score from 6.0 to 7.5!',
    image: 'https://i.pravatar.cc/150?img=5',
    course: 'Computer-Based IELTS',
    date: '2024-02-20',
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'testimonial_3',
    name: 'Mohammad Ali',
    band: 8.5,
    comment: 'Best IELTS preparation center in Sylhet. Highly recommend!',
    image: 'https://i.pravatar.cc/150?img=8',
    course: "Sultan's Intensive Care Unit",
    date: '2024-03-10',
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'testimonial_4',
    name: 'Sadia Islam',
    band: 7.0,
    comment: 'The speaking practice sessions helped me overcome my fear and boost my confidence.',
    image: 'https://i.pravatar.cc/150?img=9',
    course: 'Spoken English Course',
    date: '2024-03-25',
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

// Sample features data
const features = [
  {
    id: 'feature_1',
    title: 'Expert-Led Classes',
    description: 'Learn from experienced IELTS instructors with proven track records',
    icon: '👨‍🏫',
    isActive: true,
    order: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: 'feature_2',
    title: 'Tailored Study Materials',
    description: 'Comprehensive materials customized for both Academic and General Training',
    icon: '📚',
    isActive: true,
    order: 2,
    createdAt: new Date().toISOString()
  },
  {
    id: 'feature_3',
    title: 'Small Group Sessions',
    description: 'Personalized attention in small groups for better learning outcomes',
    icon: '👥',
    isActive: true,
    order: 3,
    createdAt: new Date().toISOString()
  },
  {
    id: 'feature_4',
    title: 'Computer-Based Practice',
    description: 'Practice with the latest computer-based IELTS format',
    icon: '💻',
    isActive: true,
    order: 4,
    createdAt: new Date().toISOString()
  },
  {
    id: 'feature_5',
    title: 'Regular Mock Tests',
    description: 'Weekly mock tests with detailed feedback and band score estimates',
    icon: '📝',
    isActive: true,
    order: 5,
    createdAt: new Date().toISOString()
  },
  {
    id: 'feature_6',
    title: 'Spoken English Support',
    description: 'Build confidence with dedicated speaking practice sessions',
    icon: '🎤',
    isActive: true,
    order: 6,
    createdAt: new Date().toISOString()
  }
];

// Sample gallery images
const galleryImages = [
  {
    id: 'gallery_1',
    title: 'Modern Classroom',
    description: 'Our spacious and well-equipped classroom',
    url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800',
    category: 'classroom',
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'gallery_2',
    title: 'Student Success Celebration',
    description: 'Celebrating our students achievements',
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
    category: 'events',
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'gallery_3',
    title: 'Award Ceremony',
    description: 'British Council recognition ceremony',
    url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800',
    category: 'achievements',
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'gallery_4',
    title: 'Study Area',
    description: 'Quiet study space for students',
    url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800',
    category: 'facilities',
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

// Sample questions
const questions = [
  {
    id: 'question_1',
    type: 'multiple-choice',
    section: 'listening',
    difficulty: 'easy',
    question: 'What is the main topic of the conversation?',
    options: ['Travel plans', 'Shopping', 'Restaurant booking', 'Weather'],
    correctAnswer: 'Travel plans',
    points: 1,
    timeLimit: 2,
    explanation: 'The speakers discuss their upcoming trip throughout the conversation.',
    tags: ['listening', 'main-idea', 'conversation'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'question_2',
    type: 'multiple-choice',
    section: 'reading',
    difficulty: 'medium',
    question: 'According to the passage, what is the primary cause of climate change?',
    options: ['Deforestation', 'Greenhouse gas emissions', 'Ocean pollution', 'Solar radiation'],
    correctAnswer: 'Greenhouse gas emissions',
    points: 1,
    timeLimit: 3,
    explanation: 'The passage clearly states that greenhouse gas emissions are the main driver of climate change.',
    tags: ['reading', 'comprehension', 'environment'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'question_3',
    type: 'essay',
    section: 'writing',
    difficulty: 'hard',
    question: 'Some people believe that technology has made our lives more complicated. Others think it has made life easier. Discuss both views and give your opinion.',
    points: 25,
    timeLimit: 40,
    explanation: 'A well-structured essay should discuss both perspectives with examples and conclude with a clear opinion.',
    tags: ['writing', 'essay', 'opinion'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

/**
 * Migrate all data to Firebase
 */
export const migrateAllData = async (): Promise<void> => {
  console.log('Starting data migration...');

  try {
    // Migrate courses
    console.log('Migrating courses...');
    const coursesData: any = {};
    courses.forEach(course => {
      coursesData[course.id] = {
        ...course,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    });
    await setData('courses', coursesData);
    console.log(`✓ Migrated ${courses.length} courses`);

    // Migrate testimonials
    console.log('Migrating testimonials...');
    const testimonialsData: any = {};
    testimonials.forEach(testimonial => {
      testimonialsData[testimonial.id] = testimonial;
    });
    await setData('homeContent/testimonials', testimonialsData);
    console.log(`✓ Migrated ${testimonials.length} testimonials`);

    // Migrate features
    console.log('Migrating features...');
    const featuresData: any = {};
    features.forEach(feature => {
      featuresData[feature.id] = feature;
    });
    await setData('homeContent/features', featuresData);
    console.log(`✓ Migrated ${features.length} features`);

    // Migrate gallery images
    console.log('Migrating gallery images...');
    const galleryData: any = {};
    galleryImages.forEach(image => {
      galleryData[image.id] = image;
    });
    await setData('homeContent/gallery', galleryData);
    console.log(`✓ Migrated ${galleryImages.length} gallery images`);

    // Migrate questions
    console.log('Migrating questions...');
    const questionsData: any = {};
    questions.forEach(question => {
      questionsData[question.id] = question;
    });
    await setData('questions', questionsData);
    console.log(`✓ Migrated ${questions.length} questions`);

    console.log('✅ Data migration completed successfully!');
  } catch (error) {
    console.error('❌ Error during migration:', error);
    throw error;
  }
};
