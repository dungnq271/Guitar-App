import { useState, useLayoutEffect, useRef } from 'react';
import { Outlet } from 'react-router';
import Header from './Header';
import Navbar from './Navbar';

export default function Layout() {
  const ref = useRef(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isOpenNav, setOpenNav] = useState(false);
  const isMobile = windowWidth < 768;

  // TODO: add feature that when user clicks anywhere the modal close in mobile view
  useLayoutEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Initial call to set the width on mount
    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
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

  useLayoutEffect(() => {
    // if user click outside the nav area then close nav
    const handleClickOutsideNav = (event: MouseEvent) => {
      const clickedElement = event.target as HTMLElement;

      if (clickedElement.id !== 'menu' && clickedElement.tagName !== 'NAV' && isOpenNav) {
        setOpenNav(false);
      }
    };

    window.addEventListener('click', handleClickOutsideNav);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('click', handleClickOutsideNav);
    };
  }, [isOpenNav]);

  return (
    <div id="outer-layout">
      <Header isMobile={isMobile} toggleMenu={() => setOpenNav(!isOpenNav)} />
      <InnerLayout isMobile={isMobile} isOpenNav={isOpenNav} />
    </div>
  );
}

interface LayoutProps {
  isMobile: boolean;
  isOpenNav: boolean;
}

function InnerLayout({ isMobile, isOpenNav }: LayoutProps) {
  return (
    <div id="inner-layout">
      <Navbar isOpen={!isMobile || isOpenNav} />
      <div className={'modal-bg' + (isMobile && isOpenNav ? '' : ' hidden')}></div>
      {
        // <div>
        // {!isMobile && <Navbar />}
        // {isMobile && isOpenNav && (
        //   <div className="modal-bg">
        //     <Navbar />
        //   </div>
        // )
        // </div>}
      }
      <Outlet />
    </div>
  );
}
