export type CourseCategory = 'full-courses' | 'practice-tests' | 'specialized' | 'all';

export interface Course {
  id: string;
  title: string;
  description: string;
  duration?: string;
  schedule?: string;
  fee: string;
  syllabus: string[];
  features: string[];
  popular: boolean;
  image: string;
  category: CourseCategory;
  location?: string;
  contact?: string;
}

export const courses: Course[] = [
  // Practice Tests & Workshops
  {
    id: 'mock-test',
    title: 'IELTS Mock Test',
    description: 'Experience a real exam simulation for IELTS candidates, available every Wednesday and accessible from anywhere.',
    schedule: 'Every Wednesday',
    fee: '৳500',
    syllabus: ['Complete IELTS Test Simulation', 'Listening Section', 'Reading Section', 'Writing Section', 'Speaking Section'],
    features: ['Real Exam Conditions', 'Available Every Wednesday', 'Accessible From Anywhere', 'Detailed Results & Feedback'],
    popular: false,
    image: 'https://i.postimg.cc/nrqr1By1/539247467-122208956534126286-4192278702647914682-n.jpg',
    category: 'practice-tests',
    location: 'R.B Complex, 6th Floor, East-Zindabazar, Sylhet',
    contact: '01777-476142'
  },
  {
    id: 'writing-correction',
    title: 'Writing Correction Package',
    description: 'Submit your essays and reports for detailed corrections, band score estimation, and personalized improvement tips.',
    fee: '৳550',
    syllabus: ['Task 1 Report Writing', 'Task 2 Essay Writing', 'Grammar & Vocabulary Review', 'Structure & Coherence Analysis'],
    features: ['Detailed Corrections with Feedback', 'Band Score Estimation', 'Improvement Tips Provided', 'Quick Turnaround Time'],
    popular: false,
    image: 'https://i.postimg.cc/K8xkJpv3/536268281-122208266720126286-7708938899969929883-n.jpg',
    category: 'practice-tests',
    contact: '01777-476142'
  },
  {
    id: 'speaking-mock',
    title: 'Speaking Mock Session',
    description: 'One-to-one speaking practice with an instructor covering all three parts of the IELTS Speaking test with instant feedback.',
    duration: '20 Minutes',
    fee: '৳600',
    syllabus: ['Part 1 - Introduction & General Questions', 'Part 2 - Individual Long Turn', 'Part 3 - Two-Way Discussion', 'Pronunciation & Fluency Assessment'],
    features: ['One-to-One Speaking Practice', 'Instant Feedback', 'Improvement Tips', 'Band Score Estimation'],
    popular: false,
    image: 'https://i.postimg.cc/85Jjjqw9/538697568-122208847814126286-1506791474113233191-n.jpg',
    category: 'practice-tests',
    location: 'R.B Complex, 6th Floor, East-Zindabazar, Sylhet',
    contact: '01777-476142'
  },
  {
    id: 'listening-practice',
    title: 'Listening Practice Test',
    description: 'Computer-based listening test following the real IELTS exam format with answer script and detailed explanations.',
    fee: '৳500',
    syllabus: ['Section 1 - Social Needs', 'Section 2 - Social Needs', 'Section 3 - Educational/Training Context', 'Section 4 - Academic Lecture'],
    features: ['Computer-Based Format', 'Real Exam Format', 'Answer Script with Explanations', 'Listening Strategies Provided'],
    popular: false,
    image: 'https://i.postimg.cc/sDpGPCyR/531282655-122207768174126286-920943197667186533-n.jpg',
    category: 'practice-tests',
    contact: '01777-476142'
  },
  {
    id: 'reading-practice',
    title: 'Reading Practice Package',
    description: 'Full-length reading practice test with answer key, explanations, time management strategies, and band score estimate.',
    fee: '৳550',
    syllabus: ['Academic/General Reading Passages', 'Various Question Types', 'Time Management Training', 'Reading Comprehension Techniques'],
    features: ['Full-Length Reading Practice Test', 'Answer Key with Explanations', 'Time Management Strategies', 'Band Score Estimate Included'],
    popular: false,
    image: 'https://i.postimg.cc/SsvCP6tF/480479123-122187622418126286-254834324271260339-n.jpg',
    category: 'practice-tests',
    contact: '01777-476142'
  },
  {
    id: 'grammar-vocabulary',
    title: 'Grammar & Vocabulary Workshop',
    description: 'A 2-hour workshop focusing on essential grammar and vocabulary for IELTS success, including common mistakes and practice activities.',
    duration: '2 Hours',
    fee: '৳600',
    syllabus: ['IELTS Grammar Requirements', 'Essential Academic Vocabulary', 'Common Mistakes in Writing & Speaking', 'Lexical Resource Development'],
    features: ['Worksheets and Practice Activities', 'Small Group Class (Max 15)', 'Focus on Common IELTS Mistakes', 'Take-Home Materials'],
    popular: false,
    image: 'https://i.postimg.cc/8kf65r0c/531884297-122207766092126286-3499288174679764451-n.jpg',
    category: 'practice-tests',
    location: 'R.B Complex, 6th Floor, East-Zindabazar, Sylhet',
    contact: '01777-476142'
  },
  {
    id: 'ielts-main-course',
    title: 'IELTS Main Course',
    description: 'A comprehensive IELTS preparation course with special focus on speaking skills and regular assessment to track your progress.',
    fee: '৳4,000',
    syllabus: ['Complete IELTS Preparation', '3-Step Speaking Skill Development', 'IELTS Speaking Module Preparation', 'Regular Assessments'],
    features: ['7 Months Free Club Access', 'Regular Exams at Every Step', 'Free Course Completion Certificate', 'HSC & Alim Students Get ৳500 Discount'],
    popular: false,
    image: 'https://i.postimg.cc/xCwqHt4C/538764322-122208956384126286-2203106024956929594-n.jpg',
    category: 'full-courses',
    contact: '01777-476142'
  },
  {
    id: 'computer-based-ielts',
    title: 'Computer-Based IELTS',
    description: 'Specialized preparation for the computer-based IELTS exam format with up-to-date study materials and expert guidance.',
    fee: 'Special Discount - Up to 25% Off',
    syllabus: ['Computer-Based Test Strategies', 'Digital Interface Navigation', 'Typing Speed Improvement', 'On-Screen Reading Techniques'],
    features: ['Updated Study Materials', 'Expert Guidelines', 'Special Gift Included', 'Practice with Authentic Test Interface'],
    popular: false,
    image: 'https://i.postimg.cc/y8jJ5hkQ/536269114-122208451460126286-8178065957127452715-n.jpg',
    category: 'specialized',
    location: 'R.B Complex, 6th Floor, East-Zindabazar, Sylhet',
    contact: '01777-476142'
  },
  {
    id: 'spoken-english',
    title: 'Spoken English Course',
    description: 'Develop your conversational English skills with a focus on vocabulary, pronunciation, and fluency for everyday situations.',
    schedule: 'Morning: Starts 10 Sept, 11:15 AM (Sat, Mon, Wed) | Afternoon: Starts 18 Sept, 4:15 PM (Sun, Tue, Thu)',
    fee: 'Contact for details',
    syllabus: ['Vocabulary Development', 'Daily Life Conversation Practice', 'Easy Grammar Lessons', 'Interview & Presentation Training'],
    features: ['Pronunciation & Fluency Training', 'Small Group Sessions', 'Practical Conversation Scenarios', 'Regular Speaking Assessment'],
    popular: false,
    image: 'https://i.postimg.cc/mr6PZb37/538260651-122208847982126286-601535625864210434-n.jpg',
    category: 'specialized',
    contact: '01777-476142'
  },
  {
    id: 'cambridge-winning-batch',
    title: 'Cambridge Winning Batch',
    description: 'Follow the Cambridge curriculum with interactive teaching methods designed to maximize your IELTS performance.',
    fee: 'Contact for details',
    syllabus: ['Cambridge Syllabus Coverage', 'Interactive Learning Methods', 'Band-Specific Targeted Training', 'Expert Feedback System'],
    features: ['Free Study Materials', 'Regular Mock Tests', 'Speaking Partner Assignment', 'Real Exam Simulation'],
    popular: false,
    image: 'https://i.postimg.cc/9ff4j49W/537465075-122208847910126286-7760748678286341356-n.jpg',
    category: 'specialized',
    contact: '01777-476142'
  },
  {
    id: 'sultans-intensive-care',
    title: "Sultan's Intensive Care Unit (SICU)",
    description: 'An immersive daily program designed for rapid improvement with intensive training across all IELTS modules.',
    schedule: 'Daily intensive classes (2 shifts: 9:30 AM & 2:15 PM)',
    fee: 'Contact for details',
    syllabus: ['3-Hour Sessions, 6 Days/Week', '2 Modules Per Day', 'Comprehensive Skill Development', 'Intensive Practice Sessions'],
    features: ['Weekly Test Included', "Free 2 Months Speakers' Club", 'Small Group Attention', 'Rapid Progress Tracking'],
    popular: false,
    image: 'https://i.postimg.cc/G3D4rn4s/541765081-122209535678126286-7569929673749044973-n.jpg',
    category: 'specialized',
    location: 'R.B Complex, 6th Floor, East-Zindabazar, Sylhet',
    contact: '01777-476142'
  }
];
