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
        }}
      >
        <Typography
          variant="h2"
        >
          Order
        </Typography>
      </Box>
    </Container>
  );
};

export default Cart;
