import { 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User
} from 'firebase/auth';
import { ref, get, set } from 'firebase/database';
import { auth, googleProvider, database } from './config';

// Allowed admin email
const ALLOWED_ADMIN_EMAIL = 'abirsabirhossain@gmail.com';

/**
 * Initialize auth persistence on app startup
 * This ensures the session persists even after browser close/refresh
 */
export const initializeAuthPersistence = async (): Promise<void> => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    console.log('Firebase Auth persistence set to LOCAL - sessions will persist');
  } catch (error) {
    console.error('Error setting auth persistence:', error);
  }
};

/**
 * Sign in with Google (Admin only)
 */
export const signInWithGoogle = async (): Promise<{ user: User | null; error?: string }> => {
  try {
    // Set persistence to LOCAL before sign in - this ensures the session persists even after browser close
    await setPersistence(auth, browserLocalPersistence);
    
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Check if email is allowed
    if (user.email !== ALLOWED_ADMIN_EMAIL) {
      await firebaseSignOut(auth);
      return {
        user: null,
        error: 'Access denied. Only authorized admin accounts can login.'
      };
    }

    // Try to save user data to database, but don't fail login if database access is denied
    try {
      // Check if user exists in database
      const userRef = ref(database, `users/${user.uid}`);
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        // Create new admin user in database
        await set(userRef, {
          uid: user.uid,
          email: user.email,
          name: user.displayName || 'Admin',
          role: 'admin',
          profilePicture: user.photoURL || '',
          dateJoined: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        });
        console.log('Admin user created in database');
      } else {
        // Update last login
        const userRefUpdate = ref(database, `users/${user.uid}/lastLogin`);
        await set(userRefUpdate, new Date().toISOString());
        console.log('Admin last login updated');
      }
    } catch (dbError) {
      console.warn('Database operation failed, but auth succeeded:', dbError);
      // Continue anyway - admin can still access if email matches
    }

    console.log('Admin logged in successfully with persistent session');
    return { user };
  } catch (error: any) {
    console.error('Error signing in with Google:', error);
    return {
      user: null,
      error: error.message || 'Failed to sign in with Google'
    };
  }
};

/**
 * Sign in with email and password
 */
export const signInWithEmail = async (email: string, password: string): Promise<{ user: User | null; error?: string }> => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return {
      user: result.user,
      error: undefined
    };
  } catch (error: any) {
    console.error('Error signing in with email:', error);
    return {
      user: null,
      error: error.message || 'Failed to sign in'
    };
  }
};

/**
 * Register with email and password
 */
export const registerWithEmail = async (email: string, password: string): Promise<{ user: User | null; error?: string }> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return {
      user: result.user,
      error: undefined
    };
  } catch (error: any) {
    console.error('Error registering with email:', error);
    return {
      user: null,
      error: error.message || 'Failed to register'
    };
  }
};

/**
 * Sign out
 */
export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

/**
 * Get current user
 */
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

/**
 * Listen to auth state changes
 */
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Get user role from database
 */
export const getUserRole = async (uid: string): Promise<string> => {
  try {
    const userRef = ref(database, `users/${uid}/role`);
    const snapshot = await get(userRef);
    
    if (snapshot.exists()) {
      console.log('User role fetched successfully:', snapshot.val());
      return snapshot.val();
    } else {
      console.warn('User role not found in database, defaulting to admin');
      // For the hardcoded admin email, default to admin role
      return 'admin';
    }
  } catch (error) {
    console.error('Error getting user role:', error);
    // For the hardcoded admin email, default to admin role even on error
    return 'admin';
  }
};
