export type GalleryCategory = 'classroom' | 'events' | 'achievements' | 'facilities';

export interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  url: string;
  category: GalleryCategory;
  isActive: boolean;
  createdAt?: string;
}
