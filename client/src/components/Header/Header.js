import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ margin: '20px' }}>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/Menu">Menu</NavLink>
          </li>
          <li>
            <NavLink to="/Blog">Blog</NavLink>
          </li>
          <li>
            <NavLink to="/Pricing">Pricing</NavLink>
          </li>
          <li>
            <NavLink to="/Contact">Contact</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
