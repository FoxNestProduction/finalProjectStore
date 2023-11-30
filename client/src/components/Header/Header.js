import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { MenuItem, TextField, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
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
  stylesLangSelect,
} from './styles';
import { openModal, setContent } from '../../redux/slices/modalSlice';
import LoginForm from '../forms/LoginForm/LoginForm';
import useBreakpoint from '../../customHooks/useBreakpoint';
import ElevationScroll from '../ElevationScroll/ElevationScroll';
import { setAuthorization, setToken } from '../../redux/slices/authorizationSlice';
import { setUser } from '../../redux/slices/userSlice';
import { removeDataFromSessionStorage } from '../../utils/sessionStorageHelpers';
import { CHECKOUT_SS_KEY, LANGUAGES } from '../../constants/constants';
import { resetCardStates } from '../../redux/slices/favouriteSlice';
import { resetCart, setIsCart } from '../../redux/slices/cartSlice';
import MiniCart from '../MiniCart/MiniCart';
import CustomAlert from '../Alert/Alert';
import useAlert from '../../customHooks/useAlert';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { i18n, t } = useTranslation();

  const onChangeLang = (e) => {
    const langCode = e.target.value;
    i18n.changeLanguage(langCode);
  };

  const isUserAuthorized = useSelector((state) => state.authorization.isUserAuthorized);
  const favourite = useSelector((state) => state.favourites.cardStates, shallowEqual);
  const isRegistered = useSelector((state) => state.user.isRegistrationSuccessful);
  const { alert, handleShowAlert, handleCloseAlert } = useAlert();

  const [authorizedAlert, setAuthorizedAlert] = useState(false);
  const [logOutAlert, setLogOutAlert] = useState(false);

  const isLgTabletOrDesktop = useMediaQuery('(min-width:690px)');

  useEffect(() => {
    if (isUserAuthorized) {
      if (!isRegistered) {
        setAuthorizedAlert(true);
        setTimeout(() => {
          setAuthorizedAlert(false);
        }, 4000);
      }
    }
  }, [isUserAuthorized, isRegistered]);

  const dispatch = useDispatch();
  const breakpoint = useBreakpoint();
  useEffect(() => {
    if (breakpoint === 'lgTablet' || breakpoint === 'desktop') {
      setIsMobileMenuOpen(false);
    }
  }, [breakpoint, dispatch]);

  const favouritesAmount = isUserAuthorized ? Object.keys(favourite).length : null;

  const handleOpenDrawer = () => {
    setIsMobileMenuOpen(true);
  };

  const handleCloseDrawer = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const handleOpenModalLogin = useCallback(() => {
    dispatch(openModal());
    dispatch(setContent(<LoginForm />));
  }, [dispatch]);

  const handleLogOut = useCallback(() => {
    dispatch(setIsCart(false));
    dispatch(resetCart());
    dispatch(setToken(null));
    dispatch(setAuthorization(false));
    dispatch(setUser({}));
    removeDataFromSessionStorage(CHECKOUT_SS_KEY);
    dispatch(resetCardStates());

    handleShowAlert();
    setLogOutAlert(true);
    setTimeout(() => {
      handleCloseAlert();
      setLogOutAlert(false);
    }, 4000);
  }, [dispatch, handleCloseAlert, handleShowAlert]);

  const setNavigateTo = useCallback((page) => {
    if (page === 'Menu') {
      if (location.pathname === '/menu' && location.search) {
        return `/menu${location.search}`;
      }
      return '/menu';
    }
    return `/${page.toLowerCase()}`;
  }, [location.pathname, location.search]);

  const navItems = useMemo(() => ['menu', 'restaurants', 'reviews', 'contact'], []);

  return (
    <>
      {(isRegistered || authorizedAlert || logOutAlert) && alert ? (
        <CustomAlert
          type="success"
          handleCloseAlert={handleCloseAlert}
          content={isRegistered ? 'Your registration was successful!' : (logOutAlert ? 'See you soon!' : 'Welcome back!')}
        />
      ) : null}
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
                      to={setNavigateTo(page)}
                      sx={stylesNavMenuItem}
                    >
                      {t(`${page}`)}
                    </Button>
                  </ListItem>
                ))}
              </List>

              <Box sx={stylesIconsWrapper}>
                <Box sx={{ minWidth: '25px' }}>
                  <TextField
                    sx={stylesLangSelect}
                    id="standard-select-currency"
                    size="small"
                    select
                    value={i18n.language}
                    variant="standard"
                    onChange={onChangeLang}
                  >
                    {LANGUAGES.map(({ code, label }) => (
                      <MenuItem key={code} value={code}>
                        {label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                {isUserAuthorized && isLgTabletOrDesktop && (
                  <IconButton aria-label="favourites" edge="end" size="small" component={NavLink} to="/favourites">
                    <Badge badgeContent={favouritesAmount} color="primary" sx={stylesBadge}>
                      <FavoriteBorderOutlinedIcon sx={stylesIcon} />
                    </Badge>
                  </IconButton>
                )}

                <MiniCart />

                {isLgTabletOrDesktop && (isUserAuthorized ? (
                  <IconButton aria-label="logout" edge="end" size="small" onClick={handleLogOut}>
                    <ExitToAppIcon sx={stylesIcon} />
                  </IconButton>
                ) : (
                  <IconButton aria-label="login" edge="end" size="small" onClick={handleOpenModalLogin}>
                    <PersonOutlineOutlinedIcon sx={stylesPersonIcon} />
                  </IconButton>
                ))}
              </Box>

              <IconButton
                aria-label="open drawer"
                edge="end"
                size="small"
                onClick={handleOpenDrawer}
                sx={stylesBurgerButton}
              >
                <MenuIcon sx={{ fontSize: 35 }} />
              </IconButton>

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
          setNavigateTo={setNavigateTo}
        />
      </nav>
    </>
  );
};

export default memo(Header);
