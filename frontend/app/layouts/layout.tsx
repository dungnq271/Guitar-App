import { Outlet } from "react-router";
import type { Route } from "./+types/layout";
import Header from "./header";
import Navbar from "./navbar";

export async function clientLoader({ params }: Route.LoaderArgs) {
  return { userId: params.userId };
}

export default function Layout() {
  return (
    <div id="outer-grid">
      <Header />
      <Navbar />
      <Outlet />
    </div>
  );
}
