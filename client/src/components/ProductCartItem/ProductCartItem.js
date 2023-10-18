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
import { addToCart, deleteFromCart, addOneMore } from '../../redux/slices/cartSlice';
import { cartIconContainer, imgBox, textContentBox, textContent, buttonStyles, quantityStyle, textTitle } from './styles';

const ProductCartItem = ({ _id, name, cartQuantity, currentPrice, imageUrl }) => {
  const cartProducts = useSelector((state) => state.cart.cart.products);
  const dispatch = useDispatch();
  const index = cartProducts.findIndex(({ product }) => product._id === _id);
  const handleDeleteOne = () => {
    if (index !== -1) {
      const foundObject = cartProducts[index];
      (() => dispatch(deleteFromCart(foundObject)))();
    }
  };
  const handleAddOne = () => {
    if (index !== -1) {
      const foundObject = cartProducts[index];
      (() => dispatch(addOneMore(foundObject)))();
    }
  };
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
          <Typography sx={textTitle} variant="body2">
            {name}
          </Typography>
          <Typography variant="h3">
            $
            {currentPrice}
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            m: '5px 5px',
          }}
        >
          <ButtonGroup variant="outlined" aria-label="small button group">
            <Button sx={buttonStyles} onClick={handleDeleteOne}>
              <RemoveRoundedIcon />
            </Button>
            <Typography variant="body2" sx={quantityStyle}>
              {cartQuantity}
            </Typography>
            <Button sx={buttonStyles} onClick={handleAddOne}>
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
  _id: PropTypes.string,
};

ProductCartItem.defaultProps = {
  currentPrice: 12.99,
  imageUrl: './img/salads/3.png',
  name: 'Chicken Hell',
  cartQuantity: 3,
  _id: '',
};

export default ProductCartItem;
