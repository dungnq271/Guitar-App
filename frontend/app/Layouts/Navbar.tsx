import { NavLink } from 'react-router';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav id="navbar">
      <NavLink id="home" to="/">
        <HomeNav />
      </NavLink>
      <NavLink id="orders" to="/orders">
        <OrdersNav />
      </NavLink>
    </nav>
  );
}

function HomeNav() {
  return (
    <div>
      <span className="material-symbols-outlined">home</span>
      <p>Home</p>
    </div>
  );
}

function OrdersNav() {
  return (
    <div>
      <span className="material-symbols-outlined">orders</span>
      <p>Orders</p>
    </div>
  );
}
