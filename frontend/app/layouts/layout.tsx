import { Outlet } from "react-router";
import Header from "./header";
import Navbar from "./navbar";

export default function Layout() {
  return (
    <div id="outer-grid">
      <Header />
      <Navbar />
      <Outlet />
    </div>
  );
}
