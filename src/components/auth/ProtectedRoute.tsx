import React, { Component } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isAuthenticated
}) => {
  const location = useLocation();
  if (!isAuthenticated) {
    // Redirect to login and remember where the user was trying to go
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }
  return <>{children}</>;
};
export default ProtectedRoute;