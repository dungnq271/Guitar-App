import { Outlet, useNavigate, Navigate } from "react-router";
import { useEffect } from "react";
import { useAuth } from "~/provider/auth/authProvider";

export default function ProtectedRoute() {
  const { jwt } = useAuth();
  const navigate = useNavigate();
  /* const location = useLocation(); */

  useEffect(() => {
    // If not authenticated, navigate to login route
    if (!jwt) {
      console.log("navigate to /login");
      navigate("/login");
    } else {
      console.log("navigate to /");
      navigate("/");
    }
  }, [jwt]);

  /* if (!jwt) {
   *   return <Navigate to="/login" />;
   * } else {
   *   navigate("/");
   * } */

  // If authenticated, render the child routes
  return <Outlet />;
}
