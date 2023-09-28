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
import CloseIcon from '@mui/icons-material/Close';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';

import Logo from '../Logo/Logo';
import Navbar from '../Navbar/Navbar';
import styles from './Header.module.scss';
import MenuSvg from '../../assets/svgComponents/MenuSvg';

const navItems = ['Menu', 'Pricing', 'Reviews', 'Contact'];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOpenDrawer = () => {
    setMobileMenuOpen(true);
  };

  const handleCloseDrawer = () => {
    setMobileMenuOpen(false);
  };

  const drawer = (
    <Box onClick={handleCloseDrawer} sx={{ textAlign: 'center' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          py: 2,
          px: 3,
        }}
      >
        <Logo className={styles.headerLogo} />
        <IconButton
          aria-label="close drawer"
          edge="end"
          onClick={handleCloseDrawer}
        >
          <CloseIcon sx={{ fontSize: '25px' }} />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} component={NavLink} to={`/${item}`}>
              <ListItemText
                primary={item}
                sx={{
                  '& .MuiTypography-root': {
                    fontSize: '18px',
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ pl: 3 }}>
            <ListItemIcon sx={{
              minWidth: '50px',
            }}
            >
              <ShoppingCartOutlinedIcon sx={{ fontSize: 25 }} />
            </ListItemIcon>
            <ListItemText
              primary="Cart"
              sx={{
                '& .MuiTypography-root': {
                  fontSize: '18px',
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ pl: 3 }}>
            <ListItemIcon sx={{
              minWidth: '50px',
            }}
            >
              <LoginOutlinedIcon sx={{ fontSize: 25, ml: '-2px' }} />
            </ListItemIcon>
            <ListItemText
              primary="Login"
              sx={{
                '& .MuiTypography-root': {
                  fontSize: '18px',
                },
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ pl: 3 }}>
            <ListItemIcon sx={{
              minWidth: '50px',
            }}
            >
              <PersonAddAlt1OutlinedIcon sx={{ fontSize: 25 }} />
            </ListItemIcon>
            <ListItemText
              primary="Sign up"
              sx={{
                '& .MuiTypography-root': {
                  fontSize: '18px',
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

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
            <Logo className={styles.headerLogo} />
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
        <Drawer
          variant="temporary"
          open={mobileMenuOpen}
          onClose={handleCloseDrawer}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { zero: 'block', tablet: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '290px' },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
};

export default Header;
