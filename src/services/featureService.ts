import { getData, setData, updateData, deleteData, subscribeToData, objectToArray } from '../firebase/database';
import { Feature } from '../models/Feature';

const FEATURES_PATH = 'homeContent/features';

export const featureService = {
  /**
   * Get all features
   */
  async getAll(): Promise<Feature[]> {
    const data = await getData(FEATURES_PATH);
    return objectToArray(data).sort((a, b) => (a.order || 0) - (b.order || 0));
  },

  /**
   * Get active features only
   */
  async getActive(): Promise<Feature[]> {
    const all = await this.getAll();
    return all.filter(f => f.isActive);
  },

  /**
   * Get feature by ID
   */
  async getById(id: string): Promise<Feature | null> {
    const data = await getData(`${FEATURES_PATH}/${id}`);
    return data ? { id, ...data } : null;
  },

  /**
   * Create new feature
   */
  async create(feature: Omit<Feature, 'id'>): Promise<string> {
    const id = `feature_${Date.now()}`;
    await setData(`${FEATURES_PATH}/${id}`, {
      ...feature,
      createdAt: new Date().toISOString()
    });
    return id;
  },

  /**
   * Update feature
   */
  async update(id: string, updates: Partial<Feature>): Promise<void> {
    await updateData(`${FEATURES_PATH}/${id}`, updates);
  },

  /**
   * Delete feature
   */
  async delete(id: string): Promise<void> {
    await deleteData(`${FEATURES_PATH}/${id}`);
  },

  /**
   * Subscribe to features changes
   */
  subscribe(callback: (features: Feature[]) => void): () => void {
    return subscribeToData(FEATURES_PATH, (data) => {
      callback(objectToArray(data).sort((a, b) => (a.order || 0) - (b.order || 0)));
    });
  }
};
