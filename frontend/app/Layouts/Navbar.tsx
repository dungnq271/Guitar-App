import { NavLink } from 'react-router';
import './Navbar.css';

export default function Navbar({ navState }: { navState: string }) {
  return (
    <div id="sidebar">
      <nav className={navState}>
        <NavLink id="home-nav" to="/">
          <HomeNav />
        </NavLink>
        <NavLink id="orders-nav" to="/orders">
          <OrdersNav />
        </NavLink>
      </nav>
    </div>
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
