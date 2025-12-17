import { getData, setData, updateData, deleteData, subscribeToData, objectToArray } from '../firebase/database';
import { Course } from '../models/Course';

const COURSES_PATH = 'courses';

export const courseService = {
  /**
   * Get all courses
   */
  async getAll(): Promise<Course[]> {
    const data = await getData(COURSES_PATH);
    return objectToArray(data);
  },

  /**
   * Get course by ID
   */
  async getById(id: string): Promise<Course | null> {
    const data = await getData(`${COURSES_PATH}/${id}`);
    return data ? { id, ...data } : null;
  },

  /**
   * Create new course
   */
  async create(course: Omit<Course, 'id'>): Promise<string> {
    const id = `course_${Date.now()}`;
    await setData(`${COURSES_PATH}/${id}`, {
      ...course,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return id;
  },

  /**
   * Update course
   */
  async update(id: string, updates: Partial<Course>): Promise<void> {
    await updateData(`${COURSES_PATH}/${id}`, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  },

  /**
   * Delete course
   */
  async delete(id: string): Promise<void> {
    await deleteData(`${COURSES_PATH}/${id}`);
  },

  /**
   * Subscribe to courses changes
   */
  subscribe(callback: (courses: Course[]) => void): () => void {
    return subscribeToData(COURSES_PATH, (data) => {
      callback(objectToArray(data));
    });
  },

  /**
   * Get courses by category
   */
  async getByCategory(category: string): Promise<Course[]> {
    const allCourses = await this.getAll();
    if (category === 'all') return allCourses;
    return allCourses.filter(course => course.category === category);
  }
};
