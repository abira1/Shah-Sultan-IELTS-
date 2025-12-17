import { getData, setData, updateData, deleteData, subscribeToData, objectToArray } from '../firebase/database';
import { GalleryImage } from '../models/GalleryImage';

const GALLERY_PATH = 'homeContent/gallery';

export const galleryService = {
  /**
   * Get all gallery images
   */
  async getAll(): Promise<GalleryImage[]> {
    const data = await getData(GALLERY_PATH);
    return objectToArray(data);
  },

  /**
   * Get active images only
   */
  async getActive(): Promise<GalleryImage[]> {
    const all = await this.getAll();
    return all.filter(img => img.isActive);
  },

  /**
   * Get images by category
   */
  async getByCategory(category: string): Promise<GalleryImage[]> {
    const all = await this.getAll();
    return all.filter(img => img.category === category);
  },

  /**
   * Get image by ID
   */
  async getById(id: string): Promise<GalleryImage | null> {
    const data = await getData(`${GALLERY_PATH}/${id}`);
    return data ? { id, ...data } : null;
  },

  /**
   * Create new image
   */
  async create(image: Omit<GalleryImage, 'id'>): Promise<string> {
    const id = `gallery_${Date.now()}`;
    await setData(`${GALLERY_PATH}/${id}`, {
      ...image,
      createdAt: new Date().toISOString()
    });
    return id;
  },

  /**
   * Update image
   */
  async update(id: string, updates: Partial<GalleryImage>): Promise<void> {
    await updateData(`${GALLERY_PATH}/${id}`, updates);
  },

  /**
   * Delete image
   */
  async delete(id: string): Promise<void> {
    await deleteData(`${GALLERY_PATH}/${id}`);
  },

  /**
   * Subscribe to gallery changes
   */
  subscribe(callback: (images: GalleryImage[]) => void): () => void {
    return subscribeToData(GALLERY_PATH, (data) => {
      callback(objectToArray(data));
    });
  }
};
