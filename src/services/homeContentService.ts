import { getData, setData, updateData, subscribeToData } from '../firebase/database';
import { HomeContent } from '../models/HomeContent';

const HOME_CONTENT_PATH = 'homeContent/general';

export const homeContentService = {
  /**
   * Get home content
   */
  async get(): Promise<HomeContent | null> {
    const data = await getData(HOME_CONTENT_PATH);
    return data;
  },

  /**
   * Update home content
   */
  async update(homeContent: HomeContent): Promise<void> {
    await setData(HOME_CONTENT_PATH, homeContent);
  },

  /**
   * Subscribe to home content changes
   */
  subscribe(callback: (homeContent: HomeContent | null) => void): () => void {
    return subscribeToData(HOME_CONTENT_PATH, callback);
  }
};