import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
function Header() {
  return (
    <header className="header section">
      <div className="logo">
        <h1>StreamFix</h1>
      </div>
      <div className="button">
        <Link to="/login"><button className="LoginBtm">Log in</button></Link>
        <Link to="/register"><button className="Register">Register</button></Link>
      </div>
    </header>
  );
}

export default Header;
