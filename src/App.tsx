import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/Home';
import TeachersPage from './pages/Teachers';
import CoursesPage from './pages/Courses';
import AdminLogin from './pages/Auth/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Layout from './components/layout/Layout';
import RoleBasedRoute from './components/auth/RoleBasedRoute';
import { AuthProvider, useAuth } from './components/auth/AuthContext';
import { EnrollmentProvider, useEnrollment } from './contexts/EnrollmentContext';
import EnrollmentModal from './components/modals/EnrollmentModal';
import { courses } from './data/courses';

const AppRoutes = () => {
  const { isLoggedIn, userRole } = useAuth();
  const { isEnrollmentModalOpen, selectedCourseId, closeEnrollmentModal } = useEnrollment();

  return (
    <>
      <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <Layout isLoggedIn={isLoggedIn} userRole={userRole}>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/teachers"
        element={
          <Layout isLoggedIn={isLoggedIn} userRole={userRole}>
            <TeachersPage />
          </Layout>
        }
      />
      <Route
        path="/courses"
        element={
          <Layout isLoggedIn={isLoggedIn} userRole={userRole}>
            <CoursesPage />
          </Layout>
        }
      />

      {/* Admin Login */}
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* Admin Dashboard */}
      <Route
        path="/admin/*"
        element={
          <RoleBasedRoute
            isAuthenticated={isLoggedIn}
            userRole={userRole}
            allowedRoles={['admin']}
          >
            <Layout isLoggedIn={true} userRole={userRole}>
              <AdminDashboard />
            </Layout>
          </RoleBasedRoute>
        }
      />

      {/* Logout Handler */}
      <Route path="/logout" element={<LogoutHandler />} />
    </Routes>

      {/* Global Enrollment Modal */}
      <EnrollmentModal
        isOpen={isEnrollmentModalOpen}
        onClose={closeEnrollmentModal}
        courses={courses}
        selectedCourseId={selectedCourseId}
      />
    </>
  );
};

// Component to handle logout
const LogoutHandler = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate('/');
  }, [logout, navigate]);

  return <div>Logging out...</div>;
};

export function App() {
  return (
    <Router>
      <AuthProvider>
        <EnrollmentProvider>
          <AppRoutes />
        </EnrollmentProvider>
      </AuthProvider>
    </Router>
  );
}
