import { getData, setData, updateData, subscribeToData } from '../firebase/database';
import { ContactInfo } from '../models/ContactInfo';

const CONTACT_INFO_PATH = 'homeContent/contactInfo';

export const contactService = {
  /**
   * Get contact info
   */
  async get(): Promise<ContactInfo | null> {
    const data = await getData(CONTACT_INFO_PATH);
    return data;
  },

  /**
   * Update contact info
   */
  async update(contactInfo: ContactInfo): Promise<void> {
    await setData(CONTACT_INFO_PATH, contactInfo);
  },

  /**
   * Subscribe to contact info changes
   */
  subscribe(callback: (contactInfo: ContactInfo | null) => void): () => void {
    return subscribeToData(CONTACT_INFO_PATH, callback);
  }
};