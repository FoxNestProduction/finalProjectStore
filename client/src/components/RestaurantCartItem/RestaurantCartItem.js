import React from 'react';
import { Box } from '@mui/material';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import PropTypes, { string } from 'prop-types';

const RestaurantCartItem = ({ restaurantName }) => {
  const restaurants = useSelector((state) => state.cart.restaurants);
  const cartProducts = useSelector((state) => state.cart.cart.products);
  const filteredProducts = cartProducts.filter((productObj) => (
    productObj.product.restaurant_name === restaurantName
  ));
  console.log(filteredProducts);
  return (
    <Box>
      Render ProductCartItems
    </Box>
  );
};

RestaurantCartItem.propTypes = {
  restaurantName: PropTypes.string.isRequired,
};

export default RestaurantCartItem;
