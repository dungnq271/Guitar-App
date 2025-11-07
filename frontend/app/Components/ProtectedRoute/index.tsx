import { Outlet, useNavigate, Navigate } from 'react-router';
import { useEffect } from 'react';
import { useAuth } from '@/Providers/authProvider';

export default function ProtectedRoute() {
  const { jwt } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt) {
      /* console.log("navigate to /"); */
      navigate('/');
    }
  }, [jwt]);

  // If not authenticated, render the /login route
  if (!jwt) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
}
