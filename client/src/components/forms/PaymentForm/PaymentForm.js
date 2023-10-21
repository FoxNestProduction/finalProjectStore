/* eslint-disable max-len */
/* eslint-disable no-undef */
import React from 'react';
import { Form, Formik } from 'formik';
import Stack from '@mui/material/Stack';
import {
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Box from '@mui/material/Box';
import Input from '../../inputs/Input/Input';
import { subtitle } from './styles';
import CheckoutActions from '../CheckoutForm/CheckoutActions';
import { setConfirmedOrder } from '../../../redux/slices/orderSlice';
import { removeDataFromSessionStorage, setDataToSessionStorage } from '../../../utils/sessionStorageHelpers';
import { CHECKOUT_LS_KEY } from '../../../constants';
import saveUserInfoToSessionStorage from '../../../utils/saveUserInfoToSessionStorage';
import { instance } from '../../../API/instance';
import { resetCart } from '../../../redux/slices/cartSlice';

const PaymentForm = () => {
  const navigate = useNavigate();
  const isUserAuthorized = useSelector((state) => state.authorization.isUserAuthorized);
  const user = useSelector((state) => state.user.user, shallowEqual);
  const orderInfo = useSelector((state) => state.order.orderInfo, shallowEqual);
  const dispatch = useDispatch();

  const initialValues = {
    name: isUserAuthorized ? `${user.firstName} ${user.lastName}` : `${orderInfo.name}`,
    cardNumber: '0000 0000 0000 0000',
    expiryDate: '03/25',
    cvv: '123',
  };

  const handleContinue = async (values, actions) => {
    // console.log(values);

    try {
      const response = await instance.post('/orders', orderInfo);
      console.log(response);
      dispatch(setConfirmedOrder(response.data.order));
      removeDataFromSessionStorage(CHECKOUT_LS_KEY);
      dispatch(resetCart());
      if (isUserAuthorized && user) {
        saveUserInfoToSessionStorage(user);
      }
      navigate('/order-confirmation');
    } catch (err) {
      console.log('Error placing new order: ', err);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleContinue}
    >
      {({ isValid }) => (
        <Form>
          <Stack
            spacing={4}
          >
            <Typography variant="h3" component="h2" align="left" sx={subtitle}>
              Add new card
            </Typography>

            <Input name="name" id="checkout-name" label="Cardholder name*" bgColor="#FFF" disabled />
            <Input name="cardNumber" id="checkout-cardNumber" label="Card number*" bgColor="#FFF" disabled />
            <Box sx={{ display: 'flex', gap: '5%' }}>
              <Input name="expiryDate" id="checkout-expiryDate" label="Expiry date" bgColor="#FFF" disabled />
              <Input name="cvv" id="checkout-cvv" label="CVV" bgColor="#FFF" type="password" disabled />
            </Box>

          </Stack>
          <CheckoutActions isValid={isValid} />
        </Form>
      )}
    </Formik>
  );
};

export default PaymentForm;
