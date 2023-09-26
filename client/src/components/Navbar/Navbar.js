import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';

const Navbar = () => {
  return (
    <nav>
      <ul className={styles.navbar}>
        <li>
          <NavLink to="/Menu">Menu</NavLink>
        </li>
        <li>
          <NavLink to="/Pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/Blog">Blog</NavLink>
        </li>
        <li>
          <NavLink to="/Contact">Contact</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
