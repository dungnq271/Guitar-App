import { NavLink, redirect } from "react-router";
import "./header.css";
import { useAuth } from "~/provider/auth/authProvider";

export default function Header() {
  const { token, setToken } = useAuth();

  function handleSignOut() {
    setToken();
    redirect("/login");
  }

  return (
    <header>
      <div id="left-header">
        <h2>LOGO</h2>
      </div>
      {token ? (
        <div>
          <p>Profile</p>
          <NavLink to="/" onClick={handleSignOut}>
            Sign out
          </NavLink>
        </div>
      ) : (
        <div id="right-header">
          <NavLink id="login" to="/login">
            <p>Sign in</p>
          </NavLink>
          <NavLink id="register" to="/register">
            <p>Sign up</p>
          </NavLink>
        </div>
      )}
    </header>
  );
}
