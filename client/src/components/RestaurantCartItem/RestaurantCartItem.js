import React from 'react';
import { Box, Typography } from '@mui/material';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ProductCartItem from '../ProductCartItem/ProductCartItem';
import { totalSumFromCart } from '../Cart/cartFunctions';
import {
  restaurantCartItemContainer,
  textContentWrapper,
  restaurantTitle,
  flexCenter,
  totalWord,
  totalPriceFromRestaurantOrderContainer,
  totalPriceFromRestaurantOrder,
  cartProductsContainer,
} from './styles';

const RestaurantCartItem = ({ restaurantName }) => {
  const restaurants = useSelector((state) => state.cart.restaurants);
  const cartProducts = useSelector((state) => state.cart.cart.products, shallowEqual);
  const filteredProducts = cartProducts.filter((productObj) => (
    productObj.product.restaurant_name === restaurantName
  ));
  const totalSum = totalSumFromCart(filteredProducts);
  console.log(filteredProducts);
  return (
    <Box
      sx={restaurantCartItemContainer}
    >
      <Box
        sx={textContentWrapper}
      >
        <Typography
          variant="h3"
          sx={restaurantTitle}
        >
          {restaurantName}
        </Typography>
        <Box
          sx={flexCenter}
        >
          <Typography
            component="p"
            sx={totalWord}
          >
            Total:
          </Typography>
          <Box
            sx={totalPriceFromRestaurantOrderContainer}
          >
            <Typography
              variant="body3"
              sx={totalPriceFromRestaurantOrder}
            >
              $
              {totalSum}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={cartProductsContainer}
      >
        {filteredProducts.map(({ product, cartQuantity }) => (
          <ProductCartItem key={product._id} cartQuantity={cartQuantity} {...product} />))}
      </Box>
    </Box>
  );
};

RestaurantCartItem.propTypes = {
  restaurantName: PropTypes.string.isRequired,
};

export default RestaurantCartItem;
