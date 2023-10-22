import React, { useState } from 'react';
import { Popover, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import MiniCartItem from '../MiniCartItem/MiniCartItem';

const MiniCart = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const cartProducts = useSelector((state) => state.cart.cart.products);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClick}
        aria-describedby={id}
      >
        Open Minicart
      </Button>
      <Popover
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
        {cartProducts.length && cartProducts
          .map(({ product, cartQuantity }) => (
            <MiniCartItem key={product._id} cartQuantity={cartQuantity} {...product} />))}
      </Popover>
    </div>
  );
};

export default MiniCart;
