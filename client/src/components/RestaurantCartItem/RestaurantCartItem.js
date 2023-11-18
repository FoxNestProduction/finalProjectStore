import React from 'react';
import { Box, Typography } from '@mui/material';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import PropTypes, { string } from 'prop-types';
import ProductCartItem from '../ProductCartItem/ProductCartItem';
import { totalSumFromCart } from '../Cart/cartFunctions';

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
      sx={{
        border: '1px solid',
        borderColor: 'text.primary',
        borderRadius: '18px',
        p: {
          desktop: '10px 20px 30px',
        },
        // mb: {
        // mobile: '24px',
        // tablet: '85px',
        // desktop: '40px',
        // },
      }}
    >
      <Box
        sx={{
          mb: {
            desktop: '10px',
            display: 'flex',
            justifyContent: 'space-between',
          },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: 'text.primary',
            textAlign: 'center',
            fontSize: {
              desktop: '30px',
            },

          }}
        >
          {restaurantName}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body3"
            sx={{
              color: 'text.primary',
              paddingRight: {
                desktop: '5px',
              },
              fontWeight: {
                desktop: 'fontWeightSemiBold',
              },
            }}
          >
            Order amount:
          </Typography>
          <Box
            sx={{
              borderRadius: '16px',
              width: {
                desktop: '100px',
              },
              backgroundColor: 'primary.main',
              padding: {
                desktop: '5px 0px',
              },
              textAlign: 'center',
            }}
          >
            <Typography
              variant="body3"
              sx={{
                color: 'text.primaryLight',
                fontWeight: {
                  desktop: 'fontWeightSemiBold',
                },
              }}
            >
              $
              {totalSum}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: {
            // mobile: '24px',
            // mobile: '24px',
            // tablet: '30px',
            tablet: '15px',
          },

        }}
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
