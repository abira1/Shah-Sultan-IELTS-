export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
  order?: number;
  createdAt?: string;
}
