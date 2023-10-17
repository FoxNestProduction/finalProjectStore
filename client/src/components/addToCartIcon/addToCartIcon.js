import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { cartIcons, cartIconsButton } from './styles.js';

const AddToCartIcon = ({ id }) => {
  const cart = useSelector((state) => state.cart.cart.products);
  
  const dispatch = useDispatch();
  let selectedItem;
  const handleAddToCart = (event) => {
    event.preventDefault();
    const index = products.findIndex((product) => product._id === id);
    if (index !== -1) {
      const foundObject = products[index];
      selectedItem = {
        id: foundObject._id,
        currentPrice: foundObject.currentPrice,
        imageUrl: foundObject.imageUrl,
        cartQuantity: 1,
        name: foundObject.name,
      };
    }
    (() => dispatch(addToCart(selectedItem)))();
  };
  //   useEffect(() => {
  //     // Визначення, чи продукт вже в корзині
  //     const productInCart = cart.find((item) => item.id === id);
  //     if (productInCart) {
  //       // Якщо продукт в корзині, змінюємо іконку
  //       setSelectedItem(null);
  //     }
  //   }, [cart, id]);
  return (
    <IconButton aria-label="add to cart" sx={cartIconsButton} onClick={handleAddToCart}>
      <AddBoxIcon sx={cartIcons} />
      {/* { selectedItem ? (
        <AddBoxIcon sx={cartIcons} />
      ) : (
        <ShoppingCartCheckoutIcon sx={cartIcons} />
      )} */}
    </IconButton>
  );
};

AddToCartIcon.propTypes = {
  id: PropTypes.string,
};

AddToCartIcon.defaultProps = {
  id: '',
};
export default AddToCartIcon;
