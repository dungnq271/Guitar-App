import { Navigate, Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { useAuth } from "~/provider/auth/authProvider";

export default function ProtectedRoute() {
  const { jwt } = useAuth();
  const navigate = useNavigate();

  // TODO: check if token expires
  // Check if the user is authenticated
  if (!jwt) {
    // If not authenticated, redirect to the login page
    /* return <Navigate to="/login" />; */
    navigate("/login", { replace: true });
  }

  // If authenticated, render the child routes
  return <Outlet />;
}
