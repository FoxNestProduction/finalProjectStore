import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  ButtonGroup,
  Button,

} from '@mui/material';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import AddRounded from '@mui/icons-material/AddRounded';
import { useDispatch, useSelector } from 'react-redux';
import {
  cartProductImg,
  MiniCartItemContainer,
  buttonStyles,
  quantityStyle,
} from './styles';
import { deleteFromCart, addOneMore } from '../../redux/slices/cartSlice';

const MiniCartItem = ({ _id, name, cartQuantity, currentPrice, imageUrl }) => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cart.products);
  const index = cartProducts.findIndex(({ product }) => product._id === _id);
  const handleDeleteOne = () => {
    if (index !== -1) {
      const foundObject = cartProducts[index];
      dispatch(deleteFromCart(foundObject));
    }
  };
  const handleAddOne = () => {
    if (index !== -1) {
      const foundObject = cartProducts[index];
      dispatch(addOneMore(foundObject));
    }
  };
  return (
    <Card
      sx={MiniCartItemContainer}
    >
      <Box>
        <CardMedia
          component="img"
          sx={cartProductImg}
          image={imageUrl}
          alt={name}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '90%',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            alignSelf: 'center',
          }}
        >
          <CardContent>
            <Typography
              sx={{
                fontWeight: 'fontWeightSemiBold',
              }}
            >
              {name}
            </Typography>
            <Typography
              sx={{
                fontWeight: 'fontWeightSemiBold',
              }}
            >
              $
              {currentPrice}
            </Typography>
          </CardContent>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            m: '5px 5px',
          }}
        >
          <ButtonGroup
            variant="outlined"
            aria-label="small button group"
          >
            <Button
              onClick={handleDeleteOne}
              sx={buttonStyles}
            >
              <RemoveRoundedIcon />
            </Button>
            <Typography
              variant="body2"
              sx={quantityStyle}
            >
              {cartQuantity}
            </Typography>
            <Button
              onClick={handleAddOne}
              sx={buttonStyles}
            >
              <AddRounded />
            </Button>
          </ButtonGroup>

        </Box>
      </Box>
    </Card>
  );
};

MiniCartItem.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string.isRequired,
  cartQuantity: PropTypes.number,
  currentPrice: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
};

MiniCartItem.defaultProps = {
  _id: '',
  cartQuantity: 1,
  imageUrl: './img/pasta.png',
};

export default MiniCartItem;
