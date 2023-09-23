import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
// import PurchaseForm from '../Form/Form';
import MuiThemeProvider from '../../context/MuiThemeProvider';

const PublicLayout = () => {
  return (
    <>
      <header style={{ margin: '20px' }}>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Menu">Menu</Link>
            </li>
            <li>
              <Link to="/Blog">Blog</Link>
            </li>
            <li>
              <Link to="/Pricing">Pricing</Link>
            </li>
            <li>
              <Link to="/Contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default PublicLayout;
