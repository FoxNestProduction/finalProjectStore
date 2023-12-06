import React, { memo, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Badge from '@mui/material/Badge';
import PropTypes from 'prop-types';
import Link from '@mui/material/Link';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Logo from '../Logo/Logo';
import MenuItemWithIcon from '../MenuItemWithIcon/MenuItemWithIcon';
import { stylesDrawer, stylesDrawerHeader, stylesIcon, stylesListItem, stylesBadge } from './styles';
import { openModal, setContent } from '../../redux/slices/modalSlice';
import RegisterForm from '../forms/RegisterForm/RegisterForm';
import { cartIconCounterFunction } from '../Cart/cartFunctions';

const HeaderDrawer = ({ isMobileMenuOpen, navItems,
  handleCloseDrawer, handleOpenModalLogin, handleLogOut, setNavigateTo }) => {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const isUserAuthorized = useSelector((state) => state.authorization.isUserAuthorized);
  const cartProducts = useSelector((state) => state.cart.cart.products, shallowEqual);

  const handleOpenModalRegister = useCallback(() => {
    dispatch(openModal());
    dispatch(setContent(<RegisterForm />));
  }, [dispatch]);
  const favourite = useSelector((state) => state.favourites.favourites, shallowEqual);
  const favouritesAmount = isUserAuthorized ? favourite.length : null;
  const cartAmount = cartIconCounterFunction(cartProducts);

  return (
    <Drawer
      variant="temporary"
      open={isMobileMenuOpen}
      onClose={handleCloseDrawer}
      ModalProps={{ keepMounted: true }}
      sx={stylesDrawer}
    >
      <Box onClick={handleCloseDrawer} sx={{ textAlign: 'center' }}>
        <Box
          sx={stylesDrawerHeader}
        >
          <Link component={NavLink} to="/" underline="none">
            <Logo />
          </Link>
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
          {navItems.map((page) => (
            <ListItem key={page} disablePadding>
              <ListItemButton
                sx={{
                  textAlign: 'center',
                }}
                component={NavLink}
                to={setNavigateTo(page)}
              >
                <ListItemText
                  primary={t(`${page.toLowerCase()}`)}
                  sx={stylesListItem}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {isUserAuthorized && (
        <>
          <Divider />
          <List>
            <MenuItemWithIcon
              navLink
              page="Favourites"
              icon={
                (
                  <Badge badgeContent={favouritesAmount} color="primary" sx={stylesBadge}>
                    <FavoriteBorderOutlinedIcon sx={stylesIcon} />
                  </Badge>
                )
              }
            />
          </List>
        </>
        )}

        <Divider />

        <List>
          {isUserAuthorized ? (
            <MenuItemWithIcon
              page={t('logOut')}
              icon={<ExitToAppIcon sx={stylesIcon} />}
              onClick={handleLogOut}
            />
          ) : (
            <>
              <MenuItemWithIcon
                page={t('logIn')}
                icon={<LoginOutlinedIcon sx={{ ...stylesIcon, ml: '-2px' }} />}
                onClick={handleOpenModalLogin}
              />
              <MenuItemWithIcon
                page={t('signUp')}
                icon={<PersonAddAlt1OutlinedIcon sx={stylesIcon} />}
                onClick={handleOpenModalRegister}
              />
            </>
          )}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

HeaderDrawer.propTypes = {
  isMobileMenuOpen: PropTypes.bool,
  handleCloseDrawer: PropTypes.func,
  handleOpenModalLogin: PropTypes.func,
  navItems: PropTypes.array,
  handleLogOut: PropTypes.func,
  setNavigateTo: PropTypes.func,
};

HeaderDrawer.defaultProps = {
  isMobileMenuOpen: false,
  handleCloseDrawer: () => {},
  handleOpenModalLogin: () => {},
  navItems: [],
  handleLogOut: () => {},
  setNavigateTo: () => {},
};

export default memo(HeaderDrawer);
