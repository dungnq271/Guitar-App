import { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router';
import useWindowWidth from '@/Hooks/useWindowWidth';
import Header from './Header';
import Navbar from './Navbar';

export default function Layout() {
  const menuRef = useRef<HTMLButtonElement | null>(null);
  const [isNavOpen, setNavOpen] = useState(false);
  const [isNavCollapsed, setNavCollapsed] = useState(true); // collapse nav by default in mobile view (ie, removing the nav from the DOM)
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;
  const navState = !isMobile ? '' : isNavOpen ? 'slide-in' : 'slide-out';

  useEffect(() => {
    // this only run once at the start of the new view (mobile or desktop)
    // don't collapse nav if previously opened
    if (isMobile && !isNavOpen) {
      setNavCollapsed(true);
    }
  }, [isMobile]);

  return (
    <div id="outer-layout">
      <Header
        menuRef={menuRef}
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
          (!isMobile || !isNavCollapsed) && (
            <Navbar
              navState={navState}
              onClickOutside={(event?: MouseEvent) => {
                if (
                  isMobile &&
                  // click in the menu will not run this
                  menuRef.current &&
                  !menuRef.current.contains(event?.target as HTMLElement)
                ) {
                  setNavOpen(false);
                }
              }}
            />
          )
        }
        {isMobile && isNavOpen && <div className="modal-bg"></div>}
        <Outlet />
      </div>
    </div>
  );
}
