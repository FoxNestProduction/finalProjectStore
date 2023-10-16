/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {
  Divider,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Input from '../../inputs/Input/Input';
import validationSchema from './validationSchema';
import SelectForFormik from '../../inputs/Select/Select';
import {
  subtitle,
  paymentRadioBtn, paymentWrapper,
} from './styles';
import { setUser } from '../../../redux/slices/userSlice';
import CheckoutActions from './CheckoutActions';
import { CHECKOUT_LS_KEY } from '../../../constants';
import { getDataFromSessionStorage, updateSessionStorageValues } from '../../../utils/sessionStorageHelpers';

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
  const dispatch = useDispatch();

  useEffect(() => {
    const checkoutValues = getDataFromSessionStorage(CHECKOUT_LS_KEY);
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
    updateSessionStorageValues(CHECKOUT_LS_KEY, { [e.target.name]: e.target.value });
  };

  const handleContinue = async (values, actions) => {
    // console.log(values);
    // updating user info in DB and user slice
    if (isUserAuthorized && token) {
      const updatedCustomer = {
        telephone: values.tel,
      };

      // try {
      //   const response = await axios.put('http://localhost:4000/api/customers', updatedCustomer, {
      //     headers: { 'Authorization': token },
      //   });
      //   dispatch(setUser(response.data));
      // } catch (err) {
      //   console.log('Error updating user: ', err);
      // }
    }

    // cart products for unauthorised user
    // todo: замінити на продукти з LS або store;
    const cartProducts = [
      {
        product: {
          _id: '6507a306baee59670a047307',
          name: 'Margherita Pizza',
          currentPrice: 12.99,
        },
        cartQuantity: 2,
      },
      {
        product: {
          _id: '650a7e0761d4eecf99b85f01',
          name: 'Burger Haven',
          currentPrice: 10.99,
        },
        cartQuantity: 1,
      },
    ];

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
      newOrder.products = cartProducts;
    }

    // try {
    //   const response = await axios.post('http://localhost:4000/api/orders', newOrder);
    //   console.log(response);
    // } catch (err) {
    //   console.log('Error placing new order: ', err);
    // }

    // redirect to payment page if payment is set to Card
    // if (values.payment === 'Card') {
    //   navigate('/checkout/payment');
    // }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleContinue}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {({ handleBlur, isValid }) => (
        <Form>
          <Stack spacing={4}>
            <Divider />
            <Typography variant="h3" component="h2" align="left" sx={subtitle}>
              Personal Information
            </Typography>

            {/* eslint-disable-next-line no-undef */}
            <Input
              name="name"
              id="checkout-name"
              label="Name*"
              bgColor="#FFF"
              onBlur={(e) => { handleFieldBlur(e, handleBlur); }}
            />
            <Input name="email" id="checkout-email" label="Email Address*" bgColor="#FFF" onBlur={(e) => { handleFieldBlur(e, handleBlur); }} />

            <Field name="tel">
              {({ field }) => (
                <InputMask mask="+38 (099) 999-99-99" {...field} onBlur={(e) => { handleFieldBlur(e, handleBlur); }}>
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
              <Field name="city" label="City*" component={SelectForFormik} labelId="checkout-city-label" id="checkout-city" bgColor="#FFF" onBlur={(e) => { handleFieldBlur(e, handleBlur); }}>
                <MenuItem value="Kyiv">Kyiv</MenuItem>
                <MenuItem value="Lviv">Lviv</MenuItem>
              </Field>
            </FormControl>

            <Input name="street" id="checkout-street" label="Street*" bgColor="#FFF" onBlur={(e) => { handleFieldBlur(e, handleBlur); }} />
            <Box sx={{ display: 'flex', gap: '5%' }}>
              <Input name="house" id="checkout-house" label="House*" bgColor="#FFF" onBlur={(e) => { handleFieldBlur(e, handleBlur); }} />
              <Input name="apartment" id="checkout-apartment" label="Apartment" bgColor="#FFF" onBlur={(e) => { handleFieldBlur(e, handleBlur); }} />
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
          <CheckoutActions isValid={isValid} />
        </Form>
      )}
    </Formik>
  );
};

export default CheckoutForm;
