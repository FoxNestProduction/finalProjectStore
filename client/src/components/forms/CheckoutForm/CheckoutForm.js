import React from 'react';
import { Form, Formik } from 'formik';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Input from '../../Input/Input';
import validationSchema from './validationSchema';

const CheckoutForm = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    tel: '',
  };

  const handleContinue = (values, actions) => {
    console.log(values);
  };

  return (
    <Box>
      <Typography variant="h2" component="h1" align="center" mb="24px">
        Personal information
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={handleContinue}
        validationSchema={validationSchema}
      >
        {({ isValid }) => (
          <Form>
            <Stack spacing={4}>
              <Input name="firstName" id="checkout-firstName" label="First Name*" bgColor="#FFF" placeholder="Enter your first name" />
              <Input name="lastName" id="checkout-lastName" label="Last Name*" bgColor="#FFF" placeholder="Enter your last name" />
              <Input type="email" name="email" id="checkout-email" label="Email Address*" bgColor="#FFF" placeholder="Enter your e-mail" />
              <Input type="tel" name="tel" id="checkout-tel" label="Mobile Number*" bgColor="#FFF" />
              <Input type="tel" name="tel" id="checkout-tel" label="Mobile Number*" bgColor="#FFF" />
            </Stack>
            <Box>
              <Button type="button">Back</Button>
              <Button type="submit">Continue</Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CheckoutForm;
