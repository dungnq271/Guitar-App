import { Navigate, Outlet } from "react-router";
import { useAuth } from "~/provider/auth/authProvider";

export default function ProtectedRoute() {
  const { jwt } = useAuth();

  // TODO: check if token expires
  // Check if the user is authenticated
  if (!jwt) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
}
