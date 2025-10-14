import { NavLink, redirect } from "react-router";
import "./header.css";
import { useAuth } from "~/provider/auth/authProvider";
import { storeJwt, storeRefreshToken } from "~/lib/auth";
import { useEffect } from "react";
import { getUser } from "~/utils/apis";

interface Props {
  isMobile: boolean;
  toggleMenu: () => void;
}

export default function Header({ isMobile, toggleMenu }: Props) {
  const { user, jwt, setUser, setJwt, setRefreshToken } = useAuth();

  function handleSignOut() {
    /* storeJwt("");
     * storeRefreshToken(""); */
    setJwt("");
    setRefreshToken("");
    localStorage.setItem("logout", Date.now().toString()); // to support logging out from all windows
    // TODO: Hit the signout endpoint to clear the fingerprint cookie
  }

  return (
    <header>
      <div id="left-header">
        {isMobile && (
          <span
            className="material-symbols-outlined"
            id="menu"
            onClick={toggleMenu}
          >
            menu
          </span>
        )}
        <h2>LOGO</h2>
      </div>
      {jwt ? (
        <div id="avatar">
          <NavLink to="/profile">Profile user {user?.username}</NavLink>
          <NavLink to="/" onClick={handleSignOut}>
            Sign out
          </NavLink>
        </div>
      ) : (
        <div id="auth-nav">
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
