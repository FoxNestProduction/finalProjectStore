import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../Logo/Logo';
import Navbar from '../Navbar/Navbar';
import styles from './Header.module.scss';
import MenuSvg from '../../assets/svgComponents/MenuSvg';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <AppBar
        component="footer"
        position="static"
        sx={{
          bgcolor: 'transparent',
          pt: {
            zero: '25px',
            tablet: '40px',
          },
          pb: {
            zero: '25px',
            tablet: '26px',
          },
        }}
        elevation="0"
      >
        <Container
          // maxWidth="maxcontentPaddings"
          sx={{
            px: {
              zero: '30px',
              tablet: '65px',
              desktop: '90px',
            },
          }}
        >
          <Toolbar
            component="nav"
            disableGutters
            sx={{
              justifyContent: 'space-between',
            }}
          >
            <Logo className={styles.headerLogo} />
            {/* <Link component={NavLink} to="/">Home</Link> */}
            {/* <Link component={NavLink} to="/Menu">Menu</Link> */}
            {/* <Link component={NavLink} to="/Blog">Blog</Link> */}
            {/* <Link component={NavLink} to="/Pricing">Pricing</Link> */}
            <IconButton
              aria-label="open drawer"
              edge="end"
              size="small"
              onClick={handleDrawerToggle}
              sx={{
                display: {
                  tablet: 'none',
                },
              }}
            >
              <MenuSvg />
            </IconButton>
            {/* <MenuList */}
            {/*  component="nav" */}
            {/*  sx={{ */}
            {/*    display: { zero: 'none', tablet: 'block' }, */}
            {/*  }} */}
            {/* > */}
            {/*  <MenuItem component={NavLink} to="/">Home</MenuItem> */}
            {/*  <MenuItem component={NavLink} to="/Menu">Menu</MenuItem> */}
            {/*  <MenuItem component={NavLink} to="/Blog">Blog</MenuItem> */}
            {/*  <MenuItem component={NavLink} to="/Pricing">Pricing</MenuItem> */}
            {/* </MenuList> */}
          </Toolbar>
        </Container>
      </AppBar>
      <Container
        // maxWidth="maxcontentPaddings"
        sx={{
          px: {
            zero: '30px',
            tablet: '65px',
            desktop: '90px',
          },
        }}
      >
        <Divider />
      </Container>
    </>
  );
};

export default Header;
