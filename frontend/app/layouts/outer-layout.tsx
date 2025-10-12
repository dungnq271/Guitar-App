import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Outlet } from "react-router";
import Header from "./header";

export default function OuterLayout() {
  const ref = useRef(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isOpenNav, setOpenNav] = useState(false);
  const isMobile = windowWidth < 768;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Initial call to set the width on mount
    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useLayoutEffect(() => {
    // automatically close nav when in mobile view
    // or transitioning to desktop view
    if (!isMobile) {
      ref.current = isOpenNav;
      setOpenNav(false);
    } else {
      setOpenNav(ref.current);
    }
  }, [isMobile]);

  return (
    <div id="outer-layout">
      <Header isMobile={isMobile} toggleMenu={() => setOpenNav(!isOpenNav)} />
      <Outlet context={{ isMobile, isOpenNav }} />
    </div>
  );
}
