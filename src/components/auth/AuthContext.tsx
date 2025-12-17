import React, { useEffect, useState, createContext, useContext } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChange, signOut as firebaseSignOut, getUserRole, initializeAuthPersistence } from '../../firebase/auth';

interface AuthContextType {
  isLoggedIn: boolean;
  userRole: 'admin' | 'teacher' | 'student';
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userRole: 'admin',
  user: null,
  loading: true,
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<'admin' | 'teacher' | 'student'>('admin');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize auth persistence and listen to Firebase auth state changes
  useEffect(() => {
    // Initialize persistence on mount
    initializeAuthPersistence();

    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      console.log('Auth state changed:', firebaseUser ? `User: ${firebaseUser.email}` : 'No user');
      
      if (firebaseUser) {
        setUser(firebaseUser);
        setIsLoggedIn(true);
        
        // Get user role from database
        const role = await getUserRole(firebaseUser.uid);
        console.log('User role:', role);
        setUserRole(role as 'admin' | 'teacher' | 'student');
      } else {
        console.log('User signed out or session ended');
        setUser(null);
        setIsLoggedIn(false);
        setUserRole('admin');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await firebaseSignOut();
      setIsLoggedIn(false);
      setUser(null);
      setUserRole('admin');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userRole,
        user,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
