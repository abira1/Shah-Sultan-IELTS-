import { getData, setData, updateData, deleteData, subscribeToData, objectToArray } from '../firebase/database';
import { Testimonial } from '../models/Testimonial';

const TESTIMONIALS_PATH = 'homeContent/testimonials';

export const testimonialService = {
  /**
   * Get all testimonials
   */
  async getAll(): Promise<Testimonial[]> {
    const data = await getData(TESTIMONIALS_PATH);
    return objectToArray(data);
  },

  /**
   * Get active testimonials only
   */
  async getActive(): Promise<Testimonial[]> {
    const all = await this.getAll();
    return all.filter(t => t.isActive);
  },

  /**
   * Get testimonial by ID
   */
  async getById(id: string): Promise<Testimonial | null> {
    const data = await getData(`${TESTIMONIALS_PATH}/${id}`);
    return data ? { id, ...data } : null;
  },

  /**
   * Create new testimonial
   */
  async create(testimonial: Omit<Testimonial, 'id'>): Promise<string> {
    const id = `testimonial_${Date.now()}`;
    await setData(`${TESTIMONIALS_PATH}/${id}`, {
      ...testimonial,
      createdAt: new Date().toISOString()
    });
    return id;
  },

  /**
   * Update testimonial
   */
  async update(id: string, updates: Partial<Testimonial>): Promise<void> {
    await updateData(`${TESTIMONIALS_PATH}/${id}`, updates);
  },

  /**
   * Delete testimonial
   */
  async delete(id: string): Promise<void> {
    await deleteData(`${TESTIMONIALS_PATH}/${id}`);
  },

  /**
   * Subscribe to testimonials changes
   */
  subscribe(callback: (testimonials: Testimonial[]) => void): () => void {
    return subscribeToData(TESTIMONIALS_PATH, (data) => {
      callback(objectToArray(data));
    });
  }
};
