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
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HeaderDrawer from '../HeaderDrawer/HeaderDrawer';

import Logo from '../Logo/Logo';
import styles from './Header.module.scss';
import MenuSvg from '../../assets/svgComponents/MenuSvg';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserAuthorized, setIsUserAuthorized] = useState(false);

  const handleOpenDrawer = () => {
    setIsMobileMenuOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = ['Menu', 'Pricing', 'Reviews', 'Contact'];

  return (
    <>
      <AppBar
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
        <Container>
          <Toolbar
            component="nav"
            disableGutters
            sx={{
              justifyContent: 'space-between',
            }}
          >
            {/* <Logo className={styles.headerLogo} /> */}
            <Logo type="header" />
            {/* <Link component={NavLink} to="/">Home</Link> */}
            {/* <Link component={NavLink} to="/Menu">Menu</Link> */}
            {/* <Link component={NavLink} to="/Blog">Blog</Link> */}
            {/* <Link component={NavLink} to="/Pricing">Pricing</Link> */}
            <IconButton
              aria-label="open drawer"
              edge="end"
              size="small"
              onClick={handleOpenDrawer}
              sx={{
                display: {
                  tablet: 'none',
                },
                width: '50px',
                height: '50px',
                mr: '-10px',
              }}
            >
              <MenuSvg />
              {/* <MenuIcon */}
              {/*  sx={{ */}
              {/*    width: '40px', */}
              {/*    height: '40px', */}
              {/*  }} */}
              {/* /> */}
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
      <Container>
        <Divider />
      </Container>
      <nav>
        <HeaderDrawer
          isMobileMenuOpen={isMobileMenuOpen}
          handleCloseDrawer={handleCloseDrawer}
          navItems={navItems}
          isUserAuthorized={isUserAuthorized}
        />
      </nav>
    </>
  );
};

export default Header;
