/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import axios from 'axios';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputMask from 'react-input-mask';

import Input from '../../inputs/Input/Input';
import validationSchema from './validationSchema';
import SelectForFormik from '../../inputs/Select/Select';
import CheckoutActions from './CheckoutActions';
import {
  subtitle,
  paymentRadioBtn, paymentWrapper,
} from './styles';
import { setUser } from '../../../redux/slices/userSlice';
import { CHECKOUT_SS_KEY } from '../../../constants/constants';
import {
  getDataFromSessionStorage,
  removeDataFromSessionStorage, setDataToSessionStorage,
  updateSessionStorageValues,
} from '../../../utils/sessionStorageHelpers';
import { setConfirmedOrder, setOrderInfo } from '../../../redux/slices/orderSlice';
import saveUserInfoToSessionStorage from '../../../utils/saveUserInfoToSessionStorage';
import { instance } from '../../../API/instance';
import { resetCart } from '../../../redux/slices/cartSlice';

const CheckoutForm = () => {
  const navigate = useNavigate();

  const getInitialValues = () => ({
    name: '',
    email: '',
    tel: '',
    city: 'Kyiv',
    street: '',
    house: '',
    apartment: '',
    payment: 'Card',
  });

  const [initialValues, setInitialValues] = useState(getInitialValues);

  const isUserAuthorized = useSelector((state) => state.authorization.isUserAuthorized);
  const user = useSelector((state) => state.user.user, shallowEqual);
  const token = useSelector((state) => state.authorization.token);
  const cart = useSelector((state) => state.cart.cart.products);

  const dispatch = useDispatch();

  useEffect(() => {
    const checkoutValues = getDataFromSessionStorage(CHECKOUT_SS_KEY);
    const newValues = getInitialValues();

    if (checkoutValues) {
      Object.keys(checkoutValues).forEach((key) => {
        if (key in newValues) {
          newValues[key] = checkoutValues[key];
        }
      });
    }
    setInitialValues(newValues);
  }, [isUserAuthorized]);

  const handleFieldBlur = (e, handleBlur) => {
    handleBlur(e);
    updateSessionStorageValues(CHECKOUT_SS_KEY, { [e.target.name]: e.target.value });
  };

  const handleContinue = async (values) => {
    // updating user info in DB and user slice
    if (isUserAuthorized && token) {
      const updatedCustomer = {
        telephone: values.tel,
      };
      try {
        const response = await instance.put('/customers', updatedCustomer);
        dispatch(setUser(response.data));
      } catch (err) {
        console.log('Error updating user: ', err);
      }
    }

    const { name, email, tel, city, street, house, apartment, payment } = values;
    const newOrder = {
      status: 'new order',
      name,
      email,
      mobile: tel,
      deliveryAddress: {
        city,
        street,
        house,
        apartment,
      },
      paymentInfo: payment,
      letterSubject: 'Thank you for your order!',
      letterHtml: '<h1>Your order is placed.</h1>',
    };

    if (isUserAuthorized && user) {
      const { _id: id } = user;
      newOrder.customerId = id;
    } else {
      newOrder.products = cart;
    }

    if (values.payment === 'Card') {
      dispatch(setOrderInfo(newOrder));
      navigate('/checkout/payment');
    } else {
      try {
        const response = await instance.post('/orders', newOrder);
        dispatch(setConfirmedOrder(response.data.order));
        removeDataFromSessionStorage(CHECKOUT_SS_KEY);
        dispatch(resetCart());
        if (isUserAuthorized && user) {
          saveUserInfoToSessionStorage(user);
        }
        navigate('/order-confirmation');
      } catch (err) {
        console.log('Error placing new order: ', err);
      }
    }
  };

  const setInitialTouched = () => {
    const values = getDataFromSessionStorage(CHECKOUT_SS_KEY);

    if (values) {
      return {
        name: 'name' in values,
        email: 'email' in values,
        tel: 'tel' in values,
        street: 'street' in values,
        house: 'house' in values,
      };
    }
    return null;
  };

  const setIsValid = (touched, errors) => {
    return !Object.keys(errors).some((key) => touched[key] === true);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleContinue}
      validationSchema={validationSchema}
      enableReinitialize
      initialTouched={setInitialTouched()}
    >
      {({ handleBlur, touched, errors }) => (
        <Form>
          <Stack spacing={4}>
            <Divider />
            <Typography variant="h3" component="h2" align="left" sx={subtitle}>
              Personal Information
            </Typography>

            <Input
              name="name"
              id="checkout-name"
              label="Name*"
              bgColor="#FFF"
              onBlur={(e) => {
                handleFieldBlur(e, handleBlur);
              }}
            />
            <Input
              name="email"
              id="checkout-email"
              label="Email Address*"
              bgColor="#FFF"
              onBlur={(e) => { handleFieldBlur(e, handleBlur); }}
            />

            <Field name="tel">
              {({ field }) => (
                <InputMask
                  mask="+38 (099) 999-99-99"
                  {...field}
                  onBlur={(e) => { handleFieldBlur(e, handleBlur); }}
                >
                  <Input type="tel" name="tel" id="checkout-tel" bgColor="#FFF" label="Phone Number*" />
                </InputMask>
              )}
            </Field>

            <Divider />
            <Typography variant="h3" component="h2" align="left" sx={subtitle}>
              Delivery Information
            </Typography>

            <FormControl fullWidth>
              <InputLabel id="checkout-city-label">City*</InputLabel>
              <Field
                name="city"
                label="City*"
                component={SelectForFormik}
                labelId="checkout-city-label"
                id="checkout-city"
                bgColor="#FFF"
                onBlur={(e) => { handleFieldBlur(e, handleBlur); }}
              >
                <MenuItem value="Kyiv">Kyiv</MenuItem>
                <MenuItem value="Lviv">Lviv</MenuItem>
              </Field>
            </FormControl>

            <Input
              name="street"
              id="checkout-street"
              label="Street*"
              bgColor="#FFF"
              onBlur={(e) => { handleFieldBlur(e, handleBlur); }}
            />
            <Box sx={{ display: 'flex', gap: '5%' }}>
              <Input
                name="house"
                id="checkout-house"
                label="House*"
                bgColor="#FFF"
                onBlur={(e) => { handleFieldBlur(e, handleBlur); }}
              />
              <Input
                name="apartment"
                id="checkout-apartment"
                label="Apartment"
                bgColor="#FFF"
                onBlur={(e) => { handleFieldBlur(e, handleBlur); }}
              />
            </Box>

            <Divider />
            <Typography variant="h3" component="h2" align="left" sx={subtitle}>
              Payment method
            </Typography>

            <Field name="payment">
              {({ field }) => (
                <FormControl sx={paymentWrapper}>
                  <RadioGroup {...field} onBlur={(e) => { handleFieldBlur(e, handleBlur); }}>
                    <FormControlLabel value="Card" control={<Radio />} label="Card" sx={paymentRadioBtn} />
                    <FormControlLabel value="Cash" control={<Radio />} label="Cash" sx={paymentRadioBtn} />
                  </RadioGroup>
                </FormControl>
              )}
            </Field>

          </Stack>
          <CheckoutActions isValid={setIsValid(touched, errors)} />
        </Form>
      )}
    </Formik>
  );
};

export default CheckoutForm;
