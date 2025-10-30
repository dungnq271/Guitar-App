import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Outlet } from 'react-router';
import Header from './Header';
import Navbar from './Navbar';

export default function Layout() {
  let ref = useRef(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isNavOpen, setNavOpen] = useState(false);
  const [isNavCollapsed, setNavCollapsed] = useState(false); // collapse nav when in mobile view without user clicking menu
  const isMobile = windowWidth < 768;
  const navState = !isMobile ? '' : isNavOpen ? 'slide-in' : 'slide-out';

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
    // automatically close nav when transitioning to desktop view
    // and store previous nav state
    if (!isMobile) {
      ref.current = isNavOpen;
      setNavOpen(false);
    } else {
      setNavOpen(ref.current);
    }
  }, [isMobile]);

  useLayoutEffect(() => {
    // don't collapse nav if previously opened
    if (isMobile && !ref.current) {
      setNavCollapsed(true);
    }
  }, [isMobile]);

  useLayoutEffect(() => {
    // if user click outside the nav area then close nav
    const handleClickOutsideNav = (event: MouseEvent) => {
      const clickedElement = event.target as HTMLElement;
      console.log(clickedElement);

      if (
        isMobile &&
        clickedElement.id !== 'menu' &&
        clickedElement.id !== 'menu-icon' &&
        clickedElement.tagName !== 'NAV' &&
        clickedElement.offsetParent?.tagName !== 'NAV' &&
        isNavOpen
      ) {
        console.log(clickedElement);
        setNavOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutsideNav);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('click', handleClickOutsideNav);
    };
  }, [isNavOpen]);

  return (
    <div id="outer-layout">
      <Header
        isMobile={isMobile}
        toggleNavMenu={() => {
          // user click then stop collapsing nav
          if (isNavCollapsed) {
            setNavCollapsed(false);
          }
          setNavOpen(!isNavOpen);
        }}
      />
      <div id="inner-layout">
        {
          // if nav is not collapsed in mobile view then show the nav
          (!isMobile || !isNavCollapsed) && <Navbar navState={navState} />
        }
        {isMobile && isNavOpen && <div className="modal-bg"></div>}
        <Outlet />
      </div>
    </div>
  );
}
