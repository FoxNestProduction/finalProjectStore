import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import { CardMedia, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../../redux/slices/cartSlice';
import { cartIconContainer, imgBox, textContentBox, textContent, buttonStyles } from './styles';

const ProductCartItem = ({ id, name, cartQuantity, currentPrice, imageUrl }) => {
  const cartProducts = useSelector((state) => state.cart.cart.products);
  const dispatch = useDispatch();
  return (
    <Card sx={cartIconContainer}>
      <CardMedia
        component="img"
        sx={imgBox}
        image={imageUrl}
        alt="Live from space album cover"
      />
      <Box sx={textContentBox}>
        <CardContent sx={textContent}>
          <Typography variant="body2">
            {name}
          </Typography>
          <Typography variant="h3">
            {currentPrice}
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '0 auto',
          }}
        >
          <ButtonGroup variant="outlined" aria-label="small button group">
            <Button sx={buttonStyles} onClick={() => dispatch(deleteFromCart(id))}>
              <RemoveRoundedIcon />
            </Button>
            <Button sx={buttonStyles}>{cartQuantity}</Button>
            <Button sx={buttonStyles} onClick={() => {}}>
              <AddRoundedIcon />
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Card>
  );
};

ProductCartItem.propTypes = {
  currentPrice: PropTypes.number,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  cartQuantity: PropTypes.number,
  id: PropTypes.string,
};

ProductCartItem.defaultProps = {
  currentPrice: 12.99,
  imageUrl: './img/salads/3.png',
  name: 'Chicken Hell',
  cartQuantity: 3,
  id: '',
};

export default ProductCartItem;
