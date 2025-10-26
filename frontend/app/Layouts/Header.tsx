import { NavLink } from 'react-router';
import './Header.css';
import { useAuth } from '~/Providers/authProvider';

interface Props {
  isMobile: boolean;
  toggleMenu: () => void;
}

export default function Header({ isMobile, toggleMenu }: Props) {
  const { user, jwt, setJwt, setRefreshToken } = useAuth();

  function handleSignOut() {
    setJwt('');
    setRefreshToken('');
    // TODO: Hit the signout endpoint to clear the fingerprint cookie
  }

  return (
    <div id="header">
      {isMobile && (
        <span className="material-symbols-outlined" id="menu" onClick={toggleMenu}>
          menu
        </span>
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
            <div id="avatar">
              <NavLink to="/profile">Profile user {user?.username}</NavLink>
              <NavLink to="/" onClick={handleSignOut}>
                Sign out
              </NavLink>
            </div>
          ) : (
            <div id="auth-nav">
              <NavLink id="login" to="/login">
                <p>Sign in</p>
              </NavLink>
              <NavLink id="register" to="/register">
                <p>Sign up</p>
              </NavLink>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
