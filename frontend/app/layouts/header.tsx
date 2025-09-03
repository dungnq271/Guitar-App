import { NavLink } from "react-router";
import "./header.css";

interface HeaderProps {
  isLogined: boolean;
}

export default function Header({ isLogined }: HeaderProps) {
  return (
    <header>
      <div id="left-header">
        <h2>LOGO</h2>
      </div>
      {isLogined ? (
        <div>
          <p>Logined</p>
          <NavLink to="/">Sign out</NavLink>
        </div>
      ) : (
        <div id="right-header">
          <NavLink id="login" to="/login">
            <p>Sign in</p>
          </NavLink>
          <NavLink id="signup" to="/signup">
            <p>Sign up</p>
          </NavLink>
        </div>
      )}
    </header>
  );
}
