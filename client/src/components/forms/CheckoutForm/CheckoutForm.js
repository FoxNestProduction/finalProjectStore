/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {
  Divider,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router';
import { shallowEqual, useSelector } from 'react-redux';
import axios from 'axios';
import Input from '../../inputs/Input/Input';
import validationSchema from './validationSchema';
import SelectForFormik from '../../inputs/Select/Select';
import { stylesButtonCard, stylesButtonCardOutline } from '../../ProductCard/styles';
import { title, starsWrapper, backBtn, btn, continueBtn, buttonsWrapper, inputsWrapper, subtitle } from './styles';
import GroupOfStarsSvg from '../../../assets/svgComponents/GroupOfStarsSvg';

const CheckoutForm = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

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

  useEffect(() => {
    setInitialValues({
      name: user?.firstName || '',
      email: user?.email || '',
      tel: user?.tel || '',
      city: user?.address?.city || 'Kyiv',
      street: user?.address?.street || '',
      house: user?.address?.house || '',
      apartment: user?.address?.apartment || '',
      payment: 'Card',
    });
  }, [isUserAuthorized, user]);

  const handleContinue = async (values, actions) => {
    console.log(values);

    // if (isUserAuthorized && token) {
    //   const updatedCustomer = {
    //     telephone: values.tel,
    //     city: values.city,
    //     street: values.street,
    //     house: values.house,
    //     apartment: values.apartment,
    //   };
    //
    //   try {
    //     const response = await axios.put('http://localhost:4000/api/customers', updatedCustomer, {
    //       headers: {
    //         'Authorization': token,
    //       },
    //     });
    //     console.log(response);
    //   } catch (err) {
    //     console.log('Error updating user: ', err);
    //   }
    // }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Typography
        variant="h2"
        component="h1"
        align="center"
        mb="30px"
        sx={title}
      >
        {/* Order Information */}
        Checkout
      </Typography>
      <Box sx={starsWrapper}>
        <GroupOfStarsSvg />
      </Box>
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

              {/* <FormControl fullWidth> */}
              {/*  <InputLabel id="checkout-payment-label">Select payment method*</InputLabel> */}
              {/*  <Field name="payment" label="Select payment method*" component={SelectForFormik} labelId="checkout-payment-label" id="checkout-payment" bgColor="#FFF"> */}
              {/*    <MenuItem value="Card">Card</MenuItem> */}
              {/*    <MenuItem value="Cash">Cash</MenuItem> */}
              {/*  </Field> */}
              {/* </FormControl> */}

              <Field name="payment">
                {({ field }) => (
                  <FormControl
                    sx={{
                      '&.MuiFormControl-root': {
                        mt: '18px',
                      },
                    }}
                  >
                    {/* <FormLabel id="demo-radio-buttons-group-label">Select payment method</FormLabel> */}
                    <RadioGroup
                      {...field}
                    >
                      <FormControlLabel
                        value="Card"
                        control={<Radio />}
                        label="Card"
                        sx={{
                          '& .MuiTypography-root': {
                            fontSize: {
                              mobile: 14,
                              tablet: 16,
                            },
                          },
                          // '& .MuiSvgIcon-root': {
                          //   fontSize: {
                          //     tablet: 25,
                          //   },
                          // },
                        }}
                      />
                      <FormControlLabel
                        value="Cash"
                        control={<Radio />}
                        label="Cash"
                        sx={{
                          '& .MuiTypography-root': {
                            fontSize: {
                              mobile: 14,
                              tablet: 16,
                            },
                          },
                          '& .MuiSvgIcon-root': {
                            fontSize: {
                              tablet: 25,
                            },
                          },
                        }}
                      />
                    </RadioGroup>
                  </FormControl>
                )}
              </Field>

            </Stack>
            <Box sx={buttonsWrapper}>
              <Button type="button" variant="outlined" sx={{ ...btn, ...backBtn }} onClick={handleGoBack}>
                Back
              </Button>
              <Button type="submit" variant="contained" sx={{ ...btn, ...continueBtn }}>
                Continue
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CheckoutForm;
