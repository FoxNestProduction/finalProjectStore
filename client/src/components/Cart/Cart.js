import React from 'react';
import {
  Typography,
  Container,
  Box,
} from '@mui/material';

const Cart = () => {
  return (
    <Container>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: {
            mobile: 'center',
          },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: {
              mobile: 'fontWeightSemiBold',
              desktop: 'fontWeightMedium',
            },
            alignSelf: {
              mobile: 'center',
              tablet: 'flex-start',
            },
          }}
        >
          Order
        </Typography>
      </Box>
    </Container>
  );
};

export default Cart;
