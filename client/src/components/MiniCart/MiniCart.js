import React, { useState } from 'react';
import { Popover, Box, IconButton, Badge, Button, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { NavLink } from 'react-router-dom';
import MiniCartItem from '../MiniCartItem/MiniCartItem';
import { stylesBadge, stylesIcon } from './styles';
import { cartIconCounterFunction } from '../Cart/cartFunctions';

const MiniCart = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const cartProducts = useSelector((state) => state.cart.cart.products);
  const matches = useMediaQuery('(min-width:600px)');

  if (matches) {
    console.log('Працює');
  } else {
    console.log('Теж працює');
  }

  const handleClick = (event) => {
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
          display: {
            mobile: 'none',
            tablet: 'none',
            lgTablet: 'block',
          },
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
          sx={{
            backgroundColor: 'background.default',
            // backgroundColor: 'primary.main',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            mb: {
              tablet: '10px',
            },
          }}
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
          sx={{
            width: '100%',
          }}
        >
          Go to cart
        </Button>
      </Popover>
    </div>
  );
};

export default MiniCart;
