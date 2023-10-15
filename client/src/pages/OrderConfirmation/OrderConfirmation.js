import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const OrderConfirmationPage = () => {
  return (
    <Container sx={{ pt: '45px', pb: { mobile: '100px', lgTablet: '150px' } }}>
      <Typography variant="h2" conponent="h2">Your order has been confirmed</Typography>
    </Container>
  );
};

export default OrderConfirmationPage;
