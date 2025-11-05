import { NavLink } from 'react-router';
import { useState, useEffect } from 'react';
import { useAuth } from '~/Providers/authProvider';
import { nameToColour } from '~/lib/stringToColour';
import './Header.css';

interface Props {
  isMobile: boolean;
  toggleNavMenu: () => void;
}

export default function Header({ isMobile, toggleNavMenu }: Props) {
  const { user, jwt, setJwt, setRefreshToken } = useAuth();
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

  function handleSignOut() {
    setJwt('');
    setRefreshToken('');
    // TODO: Hit the signout endpoint to clear the fingerprint cookie
  }

  useEffect(() => {
    // if user click outside the nav area then close nav
    const handleClickOutsideMenu = (event: MouseEvent) => {
      const clickedElement = event.target as HTMLElement;

      if (
        isProfileMenuOpen &&
        clickedElement.id !== 'profile-image' &&
        clickedElement.id !== 'profile-menu' &&
        clickedElement.offsetParent?.id !== 'profile-menu'
      ) {
        setProfileMenuOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutsideMenu);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('click', handleClickOutsideMenu);
    };
  }, [isProfileMenuOpen]);

  return (
    <div id="header">
      {isMobile && (
        <button id="menu" onClick={toggleNavMenu}>
          <span className="material-symbols-outlined" id="menu-icon">
            menu
          </span>
        </button>
      )}
      <header>
        <div id="left-header">
          <h2 id="logo">LOGO</h2>
        </div>
        {
          // <div id="search-bar"></div>
        }
        <div id="right-header">
          {jwt ? (
            <>
              <button
                id="profile-image"
                style={{ backgroundColor: nameToColour(user.firstName + ' ' + user.lastName) }}
                onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
              >
                {user.firstName !== '' &&
                  user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()}
              </button>
              {isProfileMenuOpen && (
                <div id="profile-menu">
                  <NavLink to="/profile">My profile</NavLink>
                  <hr></hr>
                  <NavLink to="/" onClick={handleSignOut}>
                    Sign out
                  </NavLink>
                </div>
              )}
            </>
          ) : (
            <div id="auth-nav">
              <NavLink id="login-navlink" to="/login">
                <p>Sign in</p>
              </NavLink>
              <NavLink id="register-navlink" to="/register">
                <p>Sign up</p>
              </NavLink>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
