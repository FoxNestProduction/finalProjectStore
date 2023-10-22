import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import HeaderDrawer from '../HeaderDrawer/HeaderDrawer';
import Logo from '../Logo/Logo';
import {
  stylesBadge,
  stylesBurgerButton,
  stylesHeader, stylesIcon,
  stylesIconsWrapper,
  stylesNav,
  stylesNavMenu,
  stylesNavMenuItem, stylesPersonIcon,
} from './styles';
import { openModal, setContent } from '../../redux/slices/modalSlice';
import LoginForm from '../forms/LoginForm/LoginForm';
import useBreakpoint from '../../customHooks/useBreakpoint';
import ElevationScroll from '../ElevationScroll/ElevationScroll';
import { setAuthorization, setToken } from '../../redux/slices/authorizationSlice';
import { setUser } from '../../redux/slices/userSlice';
import { removeDataFromSessionStorage, setDataToSessionStorage } from '../../utils/sessionStorageHelpers';
import { CHECKOUT_LS_KEY } from '../../constants';
import { resetCardStates } from '../../redux/slices/favouriteSlice';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isUserAuthorized = useSelector((state) => state.authorization.isUserAuthorized);
  const user = useSelector((state) => state.user.user);
  const { cart } = user;
  const favourite = useSelector((state) => state.favourites.favourites);

  const dispatch = useDispatch();
  const breakpoint = useBreakpoint();

  useEffect(() => {
    if (breakpoint === 'lgTablet' || breakpoint === 'desktop') {
      setIsMobileMenuOpen(false);
    }
  }, [breakpoint]);

  const cartAmount = isUserAuthorized ? cart.length : null;
  const favouritesAmount = isUserAuthorized ? favourite.length : null;

  const handleOpenDrawer = () => {
    setIsMobileMenuOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsMobileMenuOpen(false);
  };

  const handleOpenModalLogin = () => {
    dispatch(openModal());
    dispatch(setContent(<LoginForm />));
  };

  const handleLogOut = () => {
    dispatch(setToken(null));
    dispatch(setAuthorization(false));
    dispatch(setUser({}));
    removeDataFromSessionStorage(CHECKOUT_LS_KEY);
    dispatch(resetCardStates());
  };

  const navItems = ['Menu', 'Restaurants', 'Reviews', 'Contact'];

  return (
    <>
      <ElevationScroll>
        <AppBar
          position="sticky"
          sx={stylesHeader}
        >
          <Container>
            <Toolbar component="nav" disableGutters sx={stylesNav}>
              <Link component={NavLink} to="/" underline="none">
                <Logo />
              </Link>

              <List sx={stylesNavMenu}>
                {navItems.map((page) => (
                  <ListItem key={page} disablePadding sx={{ width: 'fit-content' }}>
                    <Button
                      component={NavLink}
                      to={`/${page.toLowerCase()}`}
                      sx={stylesNavMenuItem}
                    >
                      {page}
                    </Button>
                  </ListItem>
                ))}
              </List>

              <IconButton
                aria-label="open drawer"
                edge="end"
                size="small"
                onClick={handleOpenDrawer}
                sx={stylesBurgerButton}
              >
                <MenuIcon sx={{ fontSize: 35 }} />
              </IconButton>

              <Box sx={stylesIconsWrapper}>
                {isUserAuthorized && (
                <IconButton aria-label="favourites" edge="end" size="small" component={NavLink} to="/favourites">
                  <Badge badgeContent={favouritesAmount} color="primary" sx={stylesBadge}>
                    <FavoriteBorderOutlinedIcon sx={stylesIcon} />
                  </Badge>
                </IconButton>
                )}

                <IconButton aria-label="cart" edge="end" size="small" component={NavLink} to="/cart">
                  <Badge badgeContent={cartAmount} color="primary" sx={stylesBadge}>
                    <ShoppingCartOutlinedIcon sx={stylesIcon} />
                  </Badge>
                </IconButton>

                {(isUserAuthorized) ? (
                  <IconButton aria-label="logout" edge="end" size="small" onClick={handleLogOut}>
                    <ExitToAppIcon sx={stylesIcon} />
                  </IconButton>
                ) : (
                  <IconButton aria-label="login" edge="end" size="small" onClick={handleOpenModalLogin}>
                    <PersonOutlineOutlinedIcon sx={stylesPersonIcon} />
                  </IconButton>
                )}
              </Box>
            </Toolbar>
            <Divider />
          </Container>
        </AppBar>
      </ElevationScroll>
      <nav>
        <HeaderDrawer
          isMobileMenuOpen={isMobileMenuOpen}
          handleCloseDrawer={handleCloseDrawer}
          handleOpenModalLogin={handleOpenModalLogin}
          navItems={navItems}
          handleLogOut={handleLogOut}
        />
      </nav>
    </>
  );
};

export default Header;
