import { Outlet, useOutletContext } from "react-router";
import Navbar from "./navbar";

interface ContextType {
  isMobile: boolean;
  isOpenNav: boolean;
}

export default function InnerLayout() {
  const { isMobile, isOpenNav } = useOutletContext<ContextType>();

  return (
    <div id="inner-layout">
      {!isMobile && <Navbar />}
      {isMobile && isOpenNav && (
        <div className="modal-bg">
          <Navbar />
        </div>
      )}
      <Outlet />
    </div>
  );
}
