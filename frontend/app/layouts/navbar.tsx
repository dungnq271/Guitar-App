import { NavLink } from "react-router";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav id="navbar">
      <NavLink id="home" to="/">
        Home
      </NavLink>
      <NavLink id="orders" to="/orders">
        Orders
      </NavLink>
    </nav>
  );
}
