import React from 'react';
import {
  Typography,
  Container,
  Box,
  Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
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
import ProductCartItem from '../ProductCartItem/ProductCartItem';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartProducts = useSelector((state) => state.cart.cart.products);
  const userIsHasCart = useSelector((state) => state.cart.isCart);
  const isUserAuthorization = useSelector((state) => state.authorization.isUserAuthorized);
  const userToken = useSelector((state) => state.authorization.token);

  cartProducts.pop();
  // console.log(cartProducts);
  // console.log(userIsHasCart);
  // console.log(isUserAuthorization);

  const totalSum = 24.55;

  const createCart = async () => {
    const cart = {
      products: [
        {
          product: '6507a306baee59670a047307',
          cartQuantity: 1,
        },
      ],
    };
    const headers = {
      Authorization: userToken,
    };
    try {
      const { data } = await axios.post('http://localhost:4000/api/cart', cart, { headers });
      console.log(data);
    } catch (err) {
      console.warn(err);
    }
  };

  const continueFn = () => {
    if (isUserAuthorization) {
      if (userIsHasCart) {
        console.log('We didn\'t create cart');
      } else {
        console.log('We must create cart');
        createCart();
      }
    } else {
      navigate('/personalInformation');
    }
    console.log('Continue');
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
          {cartProducts.map((product) => (
            <ProductCartItem key={product.id} {...product} />
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
          >
            Continue
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Cart;
