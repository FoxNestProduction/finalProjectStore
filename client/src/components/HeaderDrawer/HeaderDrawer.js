import React from 'react';
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
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PropTypes from 'prop-types';
import Link from '@mui/material/Link';
import { useDispatch } from 'react-redux';
import Logo from '../Logo/Logo';
import MenuItemWithIcon from '../MenuItemWithIcon/MenuItemWithIcon';
import { stylesDrawer, stylesDrawerHeader, stylesIcon, stylesListItem } from './styles';
import { setAuthorization } from '../../redux/slices/authorizationSlice';

const HeaderDrawer = ({ isMobileMenuOpen, navItems,
  isUserAuthorized, handleCloseDrawer, handleOpenModalLogin }) => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    // eslint-disable-next-line no-undef
    localStorage.removeItem('token');
    dispatch(setAuthorization(false));
  };

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
                  // '&:hover': {
                  //   bgcolor: 'primary.main',
                  // },
                }}
                component={NavLink}
                to={`/${page}`}
              >
                <ListItemText
                  primary={page}
                  sx={stylesListItem}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        <List>
          <MenuItemWithIcon
            navLink
            page="Cart"
            icon={<ShoppingCartOutlinedIcon sx={stylesIcon} />}
          />
          {isUserAuthorized && (
          <MenuItemWithIcon
            navLink
            page="Favourites"
            icon={<FavoriteBorderOutlinedIcon sx={stylesIcon} />}
          />
          )}
        </List>

        <Divider />

        <List>
          {isUserAuthorized ? (
            <MenuItemWithIcon
              page="Logout"
              icon={<ExitToAppIcon sx={stylesIcon} />}
              onClick={handleLogOut}
            />
          ) : (
            <>
              <MenuItemWithIcon
                page="Login"
                icon={<LoginOutlinedIcon sx={{ ...stylesIcon, ml: '-2px' }} />}
                onClick={handleOpenModalLogin}
              />
              <MenuItemWithIcon
                page="Sign up"
                icon={<PersonAddAlt1OutlinedIcon sx={stylesIcon} />}
                onClick={() => { console.log('Sign up'); }}
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
  navItems: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  isUserAuthorized: PropTypes.bool,
};

HeaderDrawer.defaultProps = {
  isMobileMenuOpen: false,
  handleCloseDrawer: () => {},
  handleOpenModalLogin: () => {},
  navItems: [],
  isUserAuthorized: false,
};

export default HeaderDrawer;
