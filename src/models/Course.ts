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
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
