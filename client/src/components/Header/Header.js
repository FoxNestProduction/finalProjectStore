import React, { useEffect, useState } from 'react';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
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
import Alert from '@mui/material/Alert';

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
import { setAuthorization, setToken, setIsSendMail } from '../../redux/slices/authorizationSlice';
import { setUser } from '../../redux/slices/userSlice';
import { removeDataFromSessionStorage, setDataToSessionStorage } from '../../utils/sessionStorageHelpers';
import { CHECKOUT_SS_KEY } from '../../constants/constants';
import { resetCardStates } from '../../redux/slices/favouriteSlice';
import { updateCart } from '../Cart/cartFunctions';
import { resetCart, setIsCart } from '../../redux/slices/cartSlice';
import MiniCart from '../MiniCart/MiniCart';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [alertTimer, setAlertTimer] = useState(null);
  // const [showAlert, setShowAlert] = useState(false);

  const cartProducts = useSelector((state) => state.cart.cart.products, shallowEqual);
  const isUserAuthorized = useSelector((state) => state.authorization.isUserAuthorized);
  // const isSendMail = useSelector((state) => state.authorization.isSendMail);
  // const { cart } = user; // під питанням чи потрібне це значення
  const favourite = useSelector((state) => state.favourites.cardStates);

  const dispatch = useDispatch();
  const breakpoint = useBreakpoint();
  useEffect(() => {
    if (breakpoint === 'lgTablet' || breakpoint === 'desktop') {
      setIsMobileMenuOpen(false);
    }
  }, [breakpoint, dispatch]);

  // useEffect(() => {
  //   if (isSendMail) {
  //     setShowAlert(true);
  //   }
  //   const timer = setTimeout(() => {
  //     setShowAlert(false);
  //     dispatch(setIsSendMail(false));
  //   }, 10000);
  //   setAlertTimer(timer);
  // }, [isSendMail, dispatch]);

  // useEffect(() => {
  //   return () => {
  //     if (alertTimer) {
  //       clearTimeout(alertTimer);
  //     }
  //   };
  // }, [alertTimer]);

  // const cartAmount = cartIconCounterFunction(cartProducts);
  const favouritesAmount = isUserAuthorized ? Object.keys(favourite).length : null;

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

  const handleLogOut = async () => {
    await updateCart(cartProducts);
    dispatch(setIsCart(false));
    dispatch(resetCart());
    dispatch(setToken(null));
    dispatch(setAuthorization(false));
    dispatch(setUser({}));
    removeDataFromSessionStorage(CHECKOUT_SS_KEY);
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

                <MiniCart />

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
      {/* {isSendMail && showAlert && (
        <Alert severity="success" color="info">
          You have received an email with a link to reset your password
        </Alert>
      )} */}
    </>
  );
};

export default Header;
