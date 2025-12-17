import React from 'react';
import { Navigate } from 'react-router-dom';

interface RoleBasedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  userRole: 'admin' | 'teacher' | 'student';
  allowedRoles: string[];
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
  children,
  isAuthenticated,
  userRole,
  allowedRoles,
}) => {
  // Log for debugging
  console.log('RoleBasedRoute check:', { isAuthenticated, userRole, allowedRoles });

  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to admin-login');
    return <Navigate to="/admin-login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    console.log('User role not allowed, redirecting to home');
    return <Navigate to="/" replace />;
  }

  console.log('Access granted to protected route');
  return <>{children}</>;
};

export default RoleBasedRoute;
