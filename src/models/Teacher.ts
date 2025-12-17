export interface Teacher {
  id?: string;
  name: string;
  image: string;
  qualification: string;
  specialization: 'Listening' | 'Reading' | 'Writing' | 'Speaking' | 'All Skills';
  experience: number;
  bio: string;
  achievements: string[];
  email: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}