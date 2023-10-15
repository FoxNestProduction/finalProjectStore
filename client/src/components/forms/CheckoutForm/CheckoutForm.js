/* eslint-disable max-len */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
import { useLocation, useNavigate, useParams } from 'react-router';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Input from '../../inputs/Input/Input';
import validationSchema from './validationSchema';
import SelectForFormik from '../../inputs/Select/Select';
import {
  inputsWrapper,
  subtitle,
  paymentRadioBtn, paymentWrapper,
} from './styles';
import { setUser } from '../../../redux/slices/userSlice';
import CheckoutActions from './CheckoutActions';

const CheckoutForm = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  // console.log('location CheckoutForm', location);

  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    tel: '',
    city: 'Kyiv',
    street: '',
    house: '',
    apartment: '',
    payment: 'Card',
  });

  const isUserAuthorized = useSelector((state) => state.authorization.isUserAuthorized);
  const user = useSelector((state) => state.user.user, shallowEqual);
  const token = useSelector((state) => state.authorization.token);
  const dispatch = useDispatch();

  useEffect(() => {
    setInitialValues((prev) => {
      const newValues = { ...prev };

      if (isUserAuthorized && user) {
        newValues.name = user.firstName;
        newValues.email = user.email;
        newValues.tel = user.telephone || '';
      } else {
        newValues.name = '';
        newValues.email = '';
        newValues.tel = '';
      }
      return newValues;
    });
  }, [isUserAuthorized, user]);

  const handleContinue = async (values, actions) => {
    console.log(values);

    // updating user info in DB and user slice
    if (isUserAuthorized && token) {
      console.log('hello');
      const updatedCustomer = {
        telephone: values.tel,
      };

      try {
        const response = await axios.put('http://localhost:4000/api/customers', updatedCustomer, {
          headers: { 'Authorization': token },
        });
        console.log(response);
        dispatch(setUser(response.data));
      } catch (err) {
        console.log('Error updating user: ', err);
      }
    }

    const { _id: id } = user;
    const newOrder = {

      // todo: дістати зі стор масив продуктів, зробити map корзини, куди замість id додати повний об'єкт продукту.
      products: [
        {
          product: {
            _id: '6507a306baee59670a047307',
            currentPrice: 12.99,
          },
          cartQuantity: 2,
        },
        {
          product: {
            _id: '650a7e0761d4eecf99b85f01',
            currentPrice: 10.99,
          },
          cartQuantity: 1,
        },
      ],
      // products: [
      //   {
      //     product: '6507a306baee59670a047307',
      //     cartQuantity: 2,
      //   },
      //   {
      //     product: '650a7e0761d4eecf99b85f01',
      //     cartQuantity: 1,
      //   },
      // ],
      // customerId: id,
      deliveryAddress: {
        city: values.city,
        street: values.street,
        house: values.house,
        apartment: values.apartment,
      },
      paymentInfo: values.payment,
      status: 'new order',
      email: values.email,
      mobile: values.tel,
      letterSubject: 'Thank you for order!',
      letterHtml:
        '<h1>Your order is placed. OrderNo is 023689452.</h1>',
    };

    try {
      const response = await axios.post('http://localhost:4000/api/orders', newOrder);
      console.log(response);
    } catch (err) {
      console.log('Error placing new order: ', err);
    }

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
      {({ isValid }) => (
        <Form>
          <Stack
            spacing={4}
            sx={inputsWrapper}
          >
            <Divider />
            <Typography variant="h3" component="h2" align="left" sx={subtitle}>
              Personal Information
            </Typography>

            {/* eslint-disable-next-line no-undef */}
            <Input name="name" id="checkout-name" label="Name*" bgColor="#FFF" />
            <Input name="email" id="checkout-email" label="Email Address*" bgColor="#FFF" />

            <Field name="tel">
              {({ field }) => (
                <InputMask mask="+38 (099) 999-99-99" {...field}>
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
              <Field name="city" label="City*" component={SelectForFormik} labelId="checkout-city-label" id="checkout-city" bgColor="#FFF">
                <MenuItem value="Kyiv">Kyiv</MenuItem>
                <MenuItem value="Lviv">Lviv</MenuItem>
              </Field>
            </FormControl>

            <Input name="street" id="checkout-street" label="Street*" bgColor="#FFF" />
            <Box sx={{ display: 'flex', gap: '20px' }}>
              <Input name="house" id="checkout-house" label="House*" bgColor="#FFF" />
              <Input name="apartment" id="checkout-apartment" label="Apartment" bgColor="#FFF" />
            </Box>

            <Divider />
            <Typography variant="h3" component="h2" align="left" sx={subtitle}>
              Payment method
            </Typography>

            <Field name="payment">
              {({ field }) => (
                <FormControl sx={paymentWrapper}>
                  <RadioGroup {...field}>
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
