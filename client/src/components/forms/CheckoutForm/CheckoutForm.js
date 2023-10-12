import React from 'react';
import { Field, Form, Formik } from 'formik';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { MenuItem, Select, TextField, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import InputMask from 'react-input-mask';
import Input from '../../inputs/Input/Input';
import validationSchema from './validationSchema';
import SelectForFormik from '../../inputs/Select/Select';
import { stylesButtonCard, stylesButtonCardOutline } from '../../ProductCard/styles';
import { backBtn, btn, continueBtn } from './styles';
import GroupOfStarsSvg from '../../../assets/svgComponents/GroupOfStarsSvg';

const CheckoutForm = () => {
  const initialValues = {
    // firstName: '',
    // lastName: '',
    name: '',
    email: '',
    tel: '',
    city: 'Kyiv',
    street: '',
    house: '',
    appartment: '',
    payment: 'Card',
  };

  const handleContinue = (values, actions) => {
    console.log(values);
  };

  return (
    <Box sx={{
      position: 'relative',
    }}
    >
      <Typography
        variant="h2"
        component="h1"
        align="center"
        mb="30px"
        sx={{
          fontSize: {
            tablet: '36px',
            lgTablet: '32px',
            desktop: '46px',
          },
          maxWidth: {
            lgTablet: '500px',
            desktop: '570px',
          },
          mr: {
            lgTablet: '210px',
            desktop: '270px',
          },
        }}
      >
        Personal Information
        {/* Order Information */}
        {/* Checkout */}
      </Typography>
      <Box sx={{
        display: {
          mobile: 'none',
          lgTablet: 'block',
        },
        position: 'absolute',
        top: '0',
        right: '0',
      }}
      >
        <GroupOfStarsSvg />
      </Box>
      <Formik
        initialValues={initialValues}
        onSubmit={handleContinue}
        validationSchema={validationSchema}
      >
        {({ isValid }) => (
          <Form>
            <Stack
              spacing={4}
              sx={{
                maxWidth: {
                  lgTablet: '500px',
                  desktop: '570px',
                },
                m: {
                  tablet: '0 auto',
                  lgTablet: '0 210px 0 0',
                  desktop: '0 270px 0 0',
                },
              }}
            >
              {/* <Input name="firstName" id="checkout-firstName"
              label="First Name*" bgColor="#FFF" placeholder="Enter your first name" /> */}
              {/* <Input name="lastName" id="checkout-lastName"
              label="Last Name*" bgColor="#FFF" placeholder="Enter your last name" /> */}
              <Input name="name" id="checkout-name" label="Name*" bgColor="#FFF" />
              <Input name="email" id="checkout-email" label="Email Address*" bgColor="#FFF" />
              {/* <Input type="tel" name="tel"
              id="checkout-tel" label="Mobile Number*" bgColor="#FFF" /> */}

              <Field name="tel">
                {({ field }) => (
                  <InputMask mask="+38 (099) 999-99-99" {...field}>
                    <Input type="tel" id="checkout-tel" bgColor="#FFF" label="Mobile Number*" />
                  </InputMask>
                )}
              </Field>

              <FormControl fullWidth>
                <InputLabel id="checkout-city-label">City*</InputLabel>
                <Field name="city" label="City*" component={SelectForFormik} labelId="checkout-city-label" id="checkout-city" bgColor="#FFF">
                  <MenuItem value="Kyiv">Kyiv</MenuItem>
                  <MenuItem value="Lviv">Lviv</MenuItem>
                </Field>
              </FormControl>

              <Input name="street" id="checkout-street" label="Street*" bgColor="#FFF" />
              <Box sx={{
                display: 'flex',
                gap: '20px',
              }}
              >
                <Input name="house" id="checkout-house" label="House*" bgColor="#FFF" />
                <Input name="appartment" id="checkout-appartment" label="Appartment" bgColor="#FFF" />
              </Box>

              <FormControl fullWidth>
                <InputLabel id="checkout-payment-label">Select payment method</InputLabel>
                <Field name="payment" label="Select payment method" component={SelectForFormik} labelId="checkout-payment-label" id="checkout-payment" bgColor="#FFF">
                  <MenuItem value="Card">Card</MenuItem>
                  <MenuItem value="Cash">Cash</MenuItem>
                </Field>
              </FormControl>
            </Stack>
            <Box sx={{
              mt: {
                mobile: '45px',
                lgTablet: '50px',
              },
              display: 'flex',
              justifyContent: 'space-between',
            }}
            >
              <Button type="button" variant="outlined" sx={{ ...btn, ...backBtn }}>
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
