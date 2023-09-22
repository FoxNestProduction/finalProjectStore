import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import PurchaseForm from '../Form/Form';
import MuiThemeProvider from '../../context/MuiThemeProvider';
import Header from '../Header/Header';

const PublicLayout = () => {
  return (
    <MuiThemeProvider>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer style={{ margin: '20px' }}>Footer</footer>
    </MuiThemeProvider>
  );
};

export default PublicLayout;
