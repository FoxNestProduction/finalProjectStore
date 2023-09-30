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
import Logo from '../Logo/Logo';
import ListItemWithIcon from './ListItemWithIcon';
import { stylesDrawer, stylesDrawerHeader, stylesIcon, stylesListItem } from './styles';

const HeaderDrawer = ({ isMobileMenuOpen, handleCloseDrawer, navItems, isUserAuthorized }) => {
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
          <Logo type="header" />
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
          <ListItemWithIcon
            navLink
            page="Cart"
            icon={<ShoppingCartOutlinedIcon sx={stylesIcon} />}
          />
          {isUserAuthorized && (
          <ListItemWithIcon
            navLink
            page="Favourites"
            icon={<FavoriteBorderOutlinedIcon sx={stylesIcon} />}
          />
          )}
        </List>

        <Divider />

        <List>
          {isUserAuthorized ? (
            <ListItemWithIcon
              page="Logout"
              icon={<ExitToAppIcon sx={stylesIcon} />}
              onClick={() => { console.log('Logout'); }}
            />
          ) : (
            <>
              <ListItemWithIcon
                page="Login"
                icon={<LoginOutlinedIcon sx={{ ...stylesIcon, ml: '-2px' }} />}
                onClick={() => { console.log('Login'); }}
              />
              <ListItemWithIcon
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
  navItems: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  isUserAuthorized: PropTypes.bool,
};

HeaderDrawer.defaultProps = {
  isMobileMenuOpen: false,
  handleCloseDrawer: () => {},
  navItems: [],
  isUserAuthorized: false,
};

export default HeaderDrawer;
