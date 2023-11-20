import React, { memo } from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { shallowEqual, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import { backHomeBtn } from './styles';
import { starsWrapper } from '../Chechout/styles';
import GroupOfStarsSvg from '../../assets/svgComponents/GroupOfStarsSvg';

const OrderConfirmationPage = () => {
  const order = useSelector((state) => state.order.order, shallowEqual);
  const navigate = useNavigate();

  return (
    <Container>
      <Box sx={{ position: 'relative', py: { mobile: '140px', lgTablet: '200px' } }}>
        <Box sx={{ ...starsWrapper, right: '1', transform: 'scaleX(-1)' }}>
          <GroupOfStarsSvg />
        </Box>
        <Box sx={{ ...starsWrapper, right: '0' }}>
          <GroupOfStarsSvg />
        </Box>
        <Stack spacing={4} alignItems="center">
          <Typography align="center" variant="h2" conponent="p" color="text.primary">Thank you!</Typography>
          <Typography align="center" variant="h2" conponent="p" color="text.primary">Your order is confirmed!</Typography>
          <Typography
            align="center"
            variant="h2"
            conponent="p"
            color="text.primary"
            sx={{
              fontSize: {
                mobile: '24px',
                tablet: '32px',
                desktop: '42px',
              },
            }}
          >
            Order number:
            {' '}
            {order.orderNo}
          </Typography>
          <Button
            component="a"
            variant="contained"
            sx={backHomeBtn}
            onClick={() => {
              navigate('/');
            }}
          >
            Back Home
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default memo(OrderConfirmationPage);
