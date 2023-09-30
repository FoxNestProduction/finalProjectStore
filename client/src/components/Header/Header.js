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
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import IconButton from '@mui/material/IconButton';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HeaderDrawer from '../HeaderDrawer/HeaderDrawer';

import Logo from '../Logo/Logo';
import styles from './Header.module.scss';
import MenuSvg from '../../assets/svgComponents/MenuSvg';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserAuthorized, setIsUserAuthorized] = useState(true);

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
        position="relative"
        sx={{
          bgcolor: 'transparent',
          pt: {
            mobile: '25px',
            lgTablet: '40px',
          },
          pb: {
            mobile: '25px',
            lgTablet: '26px',
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
              gap: '4vw',
            }}
          >
            <Link component={NavLink} to="/" underline="none">
              <Logo />
            </Link>
            <List sx={{
              display: {
                mobile: 'none',
                lgTablet: 'flex',
              },
              flexGrow: 0.5,
              gap: '3vw',
              justifyContent: 'flex-end',
              // position: 'absolute',
              // '@media (min-width: 481px)': {
              //   top: '55px',
              //   left: '50%',
              //   transform: 'translateX(-50%)',
              // },
            }}
            >
              {navItems.map((page) => (
                <ListItem key={page} disablePadding sx={{ width: 'fit-content' }}>
                  <Link
                    component={NavLink}
                    to={`/${page}`}
                    underline="none"
                    color="text.header"
                    sx={{
                      fontSize: {
                        lgTablet: '13px',
                        desktop: '24px',
                      },
                      fontWeight: 'fontWeightMedium',
                    }}
                  >
                    {page}
                  </Link>
                </ListItem>
              ))}
            </List>

            <IconButton
              aria-label="open drawer"
              edge="end"
              size="small"
              onClick={handleOpenDrawer}
              sx={{
                display: {
                  lgTablet: 'none',
                },
                width: '50px',
                height: '50px',
                mr: '-10px',
              }}
            >
              <MenuSvg />
            </IconButton>
            <Box sx={{
              display: {
                mobile: 'none',
                lgTablet: 'flex',
              },
              gap: '1.5vw',
              flexGrow: 2,
              justifyContent: 'flex-end',
            }}
            >

              {isUserAuthorized && (
              <IconButton
                aria-label="favourites"
                edge="end"
                size="small"
                onClick={handleOpenDrawer}
              >
                {/* <FavoriteIcon */}
                <FavoriteBorderOutlinedIcon
                  sx={{
                    // color: 'primary.main',
                    fontSize: {
                      desktop: 30,
                    },
                  }}
                />
              </IconButton>
              )}

              <IconButton
                aria-label="cart"
                edge="end"
                size="small"
                onClick={handleOpenDrawer}
              >
                {/* <LocalGroceryStoreIcon */}
                <ShoppingCartOutlinedIcon
                  sx={{
                    // color: 'primary.main',
                    width: {
                      lgTablet: '27px',
                      desktop: '34px',
                    },
                    fontSize: {
                      desktop: 30,
                    },
                  }}
                />
              </IconButton>

              {(isUserAuthorized) ? (
                <IconButton
                  aria-label="cart"
                  edge="end"
                  size="small"
                  onClick={handleOpenDrawer}
                >
                  <ExitToAppIcon sx={{
                    // color: 'primary.main',
                    width: {
                      lgTablet: '27px',
                      desktop: '34px',
                    },
                    fontSize: {
                      desktop: 30,
                    },
                  }}
                  />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="login"
                  edge="end"
                  size="small"
                  onClick={handleOpenDrawer}
                >
                  <PersonOutlineOutlinedIcon sx={{
                    fontSize: {
                      lgTablet: 27,
                      desktop: 34,
                    },
                  }}
                  />
                </IconButton>
              )}

            </Box>

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
