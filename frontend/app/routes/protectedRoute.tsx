import { Outlet, Navigate, useNavigate, useLocation } from "react-router";
import { useAuth } from "~/provider/auth/authProvider";

export default function ProtectedRoute() {
  const { jwt } = useAuth();
  /* const navigate = useNavigate(); */
  /* const location = useLocation(); */

  // If not authenticated, navigate to login route
  if (!jwt) {
    console.log("navigate to /login");
    /* return <Navigate to="/login" replace state={{ from: location }} />; */
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
}
