import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

const PublicLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer style={{ margin: '20px' }}>Footer</footer>
    </>
  );
};

export default PublicLayout;
