import { initializeApp } from 'firebase/app';
import { getDatabase, Database } from 'firebase/database';
import { getAuth, Auth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics, Analytics } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACFQ0CEkfltFy6qYGICPQFS4OPSUCLja4",
  authDomain: "ssieltsacademy.firebaseapp.com",
  databaseURL: "https://ssieltsacademy-default-rtdb.firebaseio.com/",
  projectId: "ssieltsacademy",
  storageBucket: "ssieltsacademy.firebasestorage.app",
  messagingSenderId: "535824212106",
  appId: "1:535824212106:web:752cbd58ca4c06e6fa4d73",
  measurementId: "G-7W7VEB9ZGH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const database: Database = getDatabase(app);
export const auth: Auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Analytics (only in browser environment)
let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { analytics };
export default app;
