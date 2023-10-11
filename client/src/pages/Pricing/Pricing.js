import React from 'react';
import { Container } from '@mui/material';
import CheckoutForm from '../../components/forms/CheckoutForm/CheckoutForm';

const PricingPage = () => {
  return (
    <Container sx={{ pt: '45px', pb: { mobile: '100px', lgTablet: '150px' } }}>
      <CheckoutForm />
    </Container>
  );
};

export default PricingPage;
