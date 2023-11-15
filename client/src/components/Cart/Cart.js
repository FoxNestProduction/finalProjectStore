import React, { useEffect } from 'react';
import {
  Typography,
  Container,
  Box,
  Button,
  Stack,
} from '@mui/material';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  mainBox,
  title,
  cartProductsContainer,
  continueShoppingBtn,
  priceAndContBtnWrapper,
  textAndPriceWrapper,
  deliveryTypography,
  freeTypography,
  priceWrapper,
  price,
  continueBtn,
} from './styles';
import {
  totalSumFromCart,
} from './cartFunctions';
import ProductCartItem from '../ProductCartItem/ProductCartItem';
import { fetchCart } from '../../redux/slices/cartSlice';
import RestaurantCartItem from '../RestaurantCartItem/RestaurantCartItem';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartProducts = useSelector((state) => state.cart.cart.products, shallowEqual);
  const isUserAuthorization = useSelector((state) => state.authorization.isUserAuthorized);
  const authorizationMark = useSelector((state) => state.cart.authorizationReqInProgress);
  const restaurants = useSelector((state) => state.cart.restaurants);
  const totalSum = totalSumFromCart(cartProducts);
  const getCart = () => {
    if (isUserAuthorization && !authorizationMark) {
      dispatch(fetchCart());
    }
  };

  useEffect(() => {
    getCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserAuthorization, authorizationMark]);

  const continueFn = () => {
    navigate('/checkout');
  };

  return (
    <Container>
      <Box
        sx={mainBox}
      >
        <Typography
          variant="h2"
          sx={title}
        >
          Order
        </Typography>
        <Box
          sx={cartProductsContainer}
        >
          {cartProducts.map(({ product, cartQuantity }) => (
            <ProductCartItem key={product._id} cartQuantity={cartQuantity} {...product} />
          ))}
          {!cartProducts.length && (
            <Stack direction="column" sx={{ justifyContent: 'center', alignItems: 'center', gap: 5, my: 10 }}>
              <Typography variant="h2" color="primary.main" sx={{ textAlign: 'center' }}>Oops! your cart is empty</Typography>
              <Typography variant="h3" color="text.secondary">Fill it with orders</Typography>
            </Stack>
          )}
          {restaurants.map((restaurantName, index) => (
            <RestaurantCartItem restaurantName={restaurantName} key={restaurantName} />
          ))}
        </Box>
        <Button
          LinkComponent={NavLink}
          to="/menu"
          variant="outlined"
          sx={continueShoppingBtn}
        >
          Continue shopping
        </Button>
        <Box
          sx={priceAndContBtnWrapper}
        >
          <Box
            sx={textAndPriceWrapper}
          >
            <Typography
              component="p"
              sx={deliveryTypography}
            >
              Delivery
            </Typography>
            <Typography
              component="p"
              sx={freeTypography}
            >
              Free
            </Typography>
            <Box
              sx={priceWrapper}
            >
              <Typography
                component="p"
                sx={price}
              >
                $
                {totalSum}
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            onClick={continueFn}
            sx={continueBtn}
            disabled={cartProducts.length === 0}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Cart;
