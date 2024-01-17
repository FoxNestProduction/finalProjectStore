import React, { useState, memo } from 'react';
import { Popover, Box, IconButton, Badge, Button, useMediaQuery } from '@mui/material';
import { shallowEqual, useSelector } from 'react-redux';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MiniCartItem from '../MiniCartItem/MiniCartItem';
import {
  stylesBadge,
  stylesIcon,
  dropDownListWrapper,
  goToCartBtn,
} from './styles';
import { cartIconCounterFunction } from '../Cart/cartFunctions';

const MiniCart = () => {
  const matches = useMediaQuery('(min-width:690px)');
  const { i18n, t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const cartProducts = useSelector((state) => state.cart.cart.products, shallowEqual);

  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === '/cart' && anchorEl !== null) {
    setAnchorEl(null);
  }

  if (!matches && anchorEl !== null) {
    setAnchorEl(null);
  }

  if (!cartProducts.length && anchorEl !== null) {
    setAnchorEl(null);
  }

  const handleClick = (event) => {
    if (!cartProducts.length && matches && location.pathname !== '/cart') {
      navigate('/cart');
    }
    if (!matches && location.pathname !== '/cart') {
      navigate('/cart');
    }
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const cartAmount = cartIconCounterFunction(cartProducts);

  return (
    <div>
      <IconButton
        aria-label="cart"
        edge="end"
        size="small"
        onClick={handleClick}
        aria-describedby={id}
      >
        <Badge
          badgeContent={cartAmount}
          color="primary"
          sx={stylesBadge}
        >
          <ShoppingCartOutlinedIcon sx={stylesIcon} />
        </Badge>
      </IconButton>
      <Popover
        sx={{
          opacity: '0.9',
        }}
        id={id}
        onClose={handleClose}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box
          sx={dropDownListWrapper}
        >
          {cartProducts.length && cartProducts
            .map(({ product, cartQuantity }) => (
              <MiniCartItem key={product._id} cartQuantity={cartQuantity} {...product} />))}
        </Box>
        <Button
          variant="contained"
          component={NavLink}
          to="/cart"
          onClick={handleClose}
          sx={goToCartBtn}
        >
          {t('cart.goToCart')}
        </Button>
      </Popover>
    </div>
  );
};

export default memo(MiniCart);
