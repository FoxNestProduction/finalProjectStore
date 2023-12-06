import React, { memo, useEffect } from 'react';
import {
  Typography,
  Container,
  Box,
  Button,
  Stack,
} from '@mui/material';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
import { fetchCart } from '../../redux/slices/cartSlice';
import RestaurantCartItem from '../RestaurantCartItem/RestaurantCartItem';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
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
  const delivery = restaurants.length * 2;

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
          {t('cart.order')}
        </Typography>
        <Box
          sx={cartProductsContainer}
        >
          {!cartProducts.length && (
            <Stack direction="column" sx={{ justifyContent: 'center', alignItems: 'center', gap: 5, my: 10 }}>
              <Typography variant="h2" color="primary.main" sx={{ textAlign: 'center' }}>{t('cart.oopsCart')}</Typography>
              <Typography variant="h3" color="text.secondary">{t('cart.fillItWithOrders')}</Typography>
            </Stack>
          )}
          {cartProducts.length !== 0 && (
            restaurants.map((restaurantName) => (
              <RestaurantCartItem restaurantName={restaurantName} key={restaurantName} />
            )))}
        </Box>
        <Button
          LinkComponent={NavLink}
          to="/menu"
          variant="outlined"
          sx={continueShoppingBtn}
        >
          {t('cart.continueShopping')}
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
              {t('cart.delivery')}
            </Typography>
            <Typography
              component="p"
              sx={freeTypography}
            >
              {delivery === 0 ? `$${delivery}` : `$${delivery}.00`}
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
            {t('cart.continue')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default memo(Cart);
