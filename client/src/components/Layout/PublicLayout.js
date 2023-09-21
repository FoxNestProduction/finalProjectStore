import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PurchaseForm from '../Form/Form';
import CustomInput from '../Input/Input';

const PublicLayout = () => {
  const theme = createTheme({
    // typography: {
    //   input: {
    //     fontSize: '24px',
    //   },
    // },
  });

  console.log(theme);
  return (
    <ThemeProvider theme={theme}>
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
      <footer style={{ margin: '20px' }}>Footer</footer>
      <PurchaseForm />
    </ThemeProvider>
  );
};

export default PublicLayout;
