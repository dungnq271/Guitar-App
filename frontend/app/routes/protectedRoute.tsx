import { Outlet, useNavigate, Navigate } from "react-router";
import { useEffect, useLayoutEffect } from "react";
import { useAuth } from "~/provider/auth/authProvider";

export default function ProtectedRoute() {
  const { jwt } = useAuth();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (jwt) {
      /* console.log("navigate to /"); */
      navigate("/");
    }
  }, [jwt]);

  // If not authenticated, render the /login route
  if (!jwt) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
}
