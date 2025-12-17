export type QuestionType = 'multiple-choice' | 'essay' | 'listening' | 'reading' | 'speaking' | 'short-answer';
export type QuestionSection = 'listening' | 'reading' | 'writing' | 'speaking';
export type QuestionDifficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  type: QuestionType;
  section: QuestionSection;
  difficulty: QuestionDifficulty;
  question: string;
  options?: string[];
  correctAnswer?: string;
  points: number;
  timeLimit: number; // in minutes
  explanation?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
}
