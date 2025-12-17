import { getData, setData, updateData, deleteData, subscribeToData, objectToArray } from '../firebase/database';
import { Question } from '../models/Question';

const QUESTIONS_PATH = 'questions';

export const questionService = {
  /**
   * Get all questions
   */
  async getAll(): Promise<Question[]> {
    const data = await getData(QUESTIONS_PATH);
    return objectToArray(data);
  },

  /**
   * Get question by ID
   */
  async getById(id: string): Promise<Question | null> {
    const data = await getData(`${QUESTIONS_PATH}/${id}`);
    return data ? { id, ...data } : null;
  },

  /**
   * Get questions by section
   */
  async getBySection(section: string): Promise<Question[]> {
    const all = await this.getAll();
    return all.filter(q => q.section === section);
  },

  /**
   * Get questions by difficulty
   */
  async getByDifficulty(difficulty: string): Promise<Question[]> {
    const all = await this.getAll();
    return all.filter(q => q.difficulty === difficulty);
  },

  /**
   * Create new question
   */
  async create(question: Omit<Question, 'id'>): Promise<string> {
    const id = `question_${Date.now()}`;
    await setData(`${QUESTIONS_PATH}/${id}`, {
      ...question,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return id;
  },

  /**
   * Update question
   */
  async update(id: string, updates: Partial<Question>): Promise<void> {
    await updateData(`${QUESTIONS_PATH}/${id}`, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  },

  /**
   * Delete question
   */
  async delete(id: string): Promise<void> {
    await deleteData(`${QUESTIONS_PATH}/${id}`);
  },

  /**
   * Subscribe to questions changes
   */
  subscribe(callback: (questions: Question[]) => void): () => void {
    return subscribeToData(QUESTIONS_PATH, (data) => {
      callback(objectToArray(data));
    });
  }
};
