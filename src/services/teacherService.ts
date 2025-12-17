import { getData, setData, updateData, deleteData, subscribeToData, objectToArray } from '../firebase/database';
import { Teacher } from '../models/Teacher';

const TEACHERS_PATH = 'teachers';

export const teacherService = {
  /**
   * Get all teachers
   */
  async getAll(): Promise<Teacher[]> {
    const data = await getData(TEACHERS_PATH);
    return objectToArray(data);
  },

  /**
   * Get active teachers only
   */
  async getActive(): Promise<Teacher[]> {
    const all = await this.getAll();
    return all.filter(teacher => teacher.isActive);
  },

  /**
   * Get teacher by ID
   */
  async getById(id: string): Promise<Teacher | null> {
    const data = await getData(`${TEACHERS_PATH}/${id}`);
    return data ? { id, ...data } : null;
  },

  /**
   * Create new teacher
   */
  async create(teacher: Omit<Teacher, 'id'>): Promise<string> {
    const id = `teacher_${Date.now()}`;
    await setData(`${TEACHERS_PATH}/${id}`, {
      ...teacher,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return id;
  },

  /**
   * Update teacher
   */
  async update(id: string, updates: Partial<Teacher>): Promise<void> {
    await updateData(`${TEACHERS_PATH}/${id}`, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  },

  /**
   * Delete teacher
   */
  async delete(id: string): Promise<void> {
    await deleteData(`${TEACHERS_PATH}/${id}`);
  },

  /**
   * Subscribe to teachers changes
   */
  subscribe(callback: (teachers: Teacher[]) => void): () => void {
    return subscribeToData(TEACHERS_PATH, (data) => {
      callback(objectToArray(data));
    });
  }
};