import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { shallowEqual, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import { backHomeBtn } from './styles';

const OrderConfirmationPage = () => {
  const order = useSelector((state) => state.order.confirmedOrder, shallowEqual);
  const navigate = useNavigate();

  return (
    <Container sx={{ pt: '45px', pb: { mobile: '100px', lgTablet: '150px', textAlign: 'center' } }}>
      <Typography align="center" variant="h2" conponent="h2">Your order is confirmed!</Typography>
      <Typography align="center" variant="h2" conponent="h2">
        Order number:
        {' '}
        {order.orderNo}
      </Typography>
      <Button
        align="center"
        component="a"
        variant="contained"
        sx={backHomeBtn}
        onClick={() => {
          navigate('/');
        }}
      >
        Back Home
      </Button>
    </Container>
  );
};

export default OrderConfirmationPage;
