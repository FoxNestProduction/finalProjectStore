/* eslint-disable max-len */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import Stack from '@mui/material/Stack';
import {
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router';
import Input from '../../inputs/Input/Input';
import validationSchema from './validationSchema';
import {
  inputsWrapper,
  subtitle,
} from './styles';
import CheckoutActions from '../CheckoutForm/CheckoutActions';

const PaymentForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: '',
  };

  const handleContinue = async (values, actions) => {
    console.log(values);

    // redirect to order confirmation page
    navigate('/order-confirmation');
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleContinue}
      validationSchema={validationSchema}
    >
      {({ isValid }) => (
        <Form>
          <Stack
            spacing={4}
            sx={inputsWrapper}
          >
            <Typography variant="h3" component="h2" align="left" sx={subtitle}>
              Add new card
            </Typography>

            <Input name="name" id="checkout-name" label="Name*" bgColor="#FFF" />

          </Stack>
          <CheckoutActions isValid={isValid} />
        </Form>
      )}
    </Formik>
  );
};

export default PaymentForm;
