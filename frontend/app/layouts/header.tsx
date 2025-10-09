import { NavLink, redirect } from "react-router";
import "./header.css";
import { useAuth } from "~/provider/auth/authProvider";

export default function Header() {
  const { user, jwt, setJwt, setRefreshToken } = useAuth();

  // FIXME: login modal float to the top-left instead of center when signing out
  function handleSignOut() {
    setJwt("");
    setRefreshToken("");
    // to support logging out from all windows
    localStorage.setItem("logout", Date.now().toString());
    redirect("/login");
  }

  return (
    <header>
      <div id="left-header">
        <h2>LOGO</h2>
      </div>
      {jwt ? (
        <div>
          <NavLink to="/profile">Profile user {user?.username}</NavLink>
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
