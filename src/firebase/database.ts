import { ref, get, set, update, remove, onValue, push, query, orderByChild, equalTo } from 'firebase/database';
import { database } from './config';

/**
 * Generic database operations
 */

// Get data from a path
export const getData = async (path: string): Promise<any> => {
  try {
    const dataRef = ref(database, path);
    const snapshot = await get(dataRef);
    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    console.error(`Error getting data from ${path}:`, error);
    throw error;
  }
};

// Set data at a path
export const setData = async (path: string, data: any): Promise<void> => {
  try {
    const dataRef = ref(database, path);
    await set(dataRef, data);
  } catch (error) {
    console.error(`Error setting data at ${path}:`, error);
    throw error;
  }
};

// Update data at a path
export const updateData = async (path: string, updates: any): Promise<void> => {
  try {
    const dataRef = ref(database, path);
    await update(dataRef, updates);
  } catch (error) {
    console.error(`Error updating data at ${path}:`, error);
    throw error;
  }
};

// Delete data at a path
export const deleteData = async (path: string): Promise<void> => {
  try {
    const dataRef = ref(database, path);
    await remove(dataRef);
  } catch (error) {
    console.error(`Error deleting data at ${path}:`, error);
    throw error;
  }
};

// Push new data (auto-generated key)
export const pushData = async (path: string, data: any): Promise<string> => {
  try {
    const dataRef = ref(database, path);
    const newRef = push(dataRef);
    await set(newRef, data);
    return newRef.key || '';
  } catch (error) {
    console.error(`Error pushing data to ${path}:`, error);
    throw error;
  }
};

// Listen to data changes
export const subscribeToData = (path: string, callback: (data: any) => void): (() => void) => {
  const dataRef = ref(database, path);
  const unsubscribe = onValue(dataRef, (snapshot) => {
    callback(snapshot.exists() ? snapshot.val() : null);
  });
  return unsubscribe;
};

// Query data
export const queryData = async (path: string, childKey: string, value: any): Promise<any> => {
  try {
    const dataRef = ref(database, path);
    const dataQuery = query(dataRef, orderByChild(childKey), equalTo(value));
    const snapshot = await get(dataQuery);
    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    console.error(`Error querying data at ${path}:`, error);
    throw error;
  }
};

// Convert Firebase object to array
export const objectToArray = (obj: any): any[] => {
  if (!obj) return [];
  return Object.keys(obj).map(key => ({
    id: key,
    ...obj[key]
  }));
};
