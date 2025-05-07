import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors';
import { logout } from '../../redux/auth/operations';

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <NavLink to="/" style={linkStyle}>Home</NavLink>
        {isLoggedIn && <NavLink to="/contacts" style={linkStyle}>Contacts</NavLink>}
      </nav>
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
};

const AuthNav = () => (
  <div>
    <NavLink to="/register" style={linkStyle}>Register</NavLink>
    <NavLink to="/login" style={linkStyle}>Login</NavLink>
  </div>
);

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <span style={{ marginRight: 12 }}>Welcome, {user.name}</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  borderBottom: '1px solid #ccc',
  backgroundColor: '#f8f8f8',
};

const navStyle = {
  display: 'flex',
  gap: '15px',
};

const linkStyle = {
  textDecoration: 'none',
  color: '#333',
};

export default AppBar;