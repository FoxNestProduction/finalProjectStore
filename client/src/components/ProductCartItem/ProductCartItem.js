import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import { CardMedia, IconButton, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { deleteFromCart, addOneMore, deleteFullProduct } from '../../redux/slices/cartSlice';
import { fixedEncodeURIComponent } from '../../utils/uriEncodeHelpers';
import { totalSumFromCartProduct } from '../Cart/cartFunctions';

import {
  cartIconContainer,
  img,
  textContentBox,
  buttonStyles,
  linkContainer,
  quantityStyle,
  textTitle,
  roundedIcons,
} from './styles';

const ProductCartItem = ({ _id, itemNo, name, cartQuantity, currentPrice, imageUrl }) => {
  const cartProducts = useSelector((state) => state.cart.cart.products);
  const dispatch = useDispatch();
  const index = cartProducts.findIndex(({ product }) => product._id === _id);
  const finallySumOfCartProduct = totalSumFromCartProduct(currentPrice, cartQuantity);
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
  const handleDeleteFullProduct = () => {
    if (index !== -1) {
      const foundObject = cartProducts[index];
      dispatch(deleteFullProduct(foundObject));
    }
  };
  return (
    <Card sx={cartIconContainer}>
      <Box sx={linkContainer}>
        <Box
          sx={{
            width: {
              mobile: '40%',
              tablet: '40%',
              desktop: '35%',
            },
          }}
        >
          <Link component={RouterLink} to={`/menu/${fixedEncodeURIComponent(name)}/${itemNo}`}>
            <CardMedia
              component="img"
              sx={img}
              image={imageUrl}
              alt="Live from space album cover"
            />
          </Link>
        </Box>
        <Box sx={textContentBox}>
          <Typography sx={textTitle} variant="body2">
            {name}
          </Typography>
          <Typography variant="h3">
            $
            {finallySumOfCartProduct}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mr: '5px',
          position: {
            mobile: 'relative',
          },
          bottom: {
            mobile: '-12px',
            // tablet: '2px',
            lgTablet: '0px',
            // desktop: '0px',
          },
          right: {
            mobile: '2px',
            // tablet: '4px',
            lgTablet: '0px',
            // desktop: '4px',
          },
        }}
      >
        <ButtonGroup variant="outlined" aria-label="small button group">
          <Button sx={buttonStyles} onClick={handleDeleteOne}>
            <RemoveRoundedIcon sx={roundedIcons} />
          </Button>
          <Typography variant="body2" sx={quantityStyle}>
            {cartQuantity}
          </Typography>
          <Button sx={buttonStyles} onClick={handleAddOne}>
            <AddRoundedIcon sx={roundedIcons} />
          </Button>
        </ButtonGroup>
      </Box>
      <IconButton
        onClick={handleDeleteFullProduct}
        aria-label="CloseRoundedIcon"
        size="small"
        color="secondary"
        sx={{
          p: {
            mobile: '1px',
            lgTablet: '2px',
            desktop: '4px',
          },
          position: 'absolute',
          top: {
            mobile: '3px',
            tablet: '3px',
            lgTablet: '4px',
            desktop: '3px',
          },
          right: {
            mobile: '4px',
            tablet: '4px',
            lgTablet: '4px',
            desktop: '4px',
          },
        }}
      >
        <CloseRoundedIcon
          fontSize="small"
          sx={{
            fontSize: {
              mobile: '16px',
              tablet: '18px',
              lgTablet: '22px',
              desktop: '26px',
            },
          }}
        />
      </IconButton>
    </Card>
  );
};

ProductCartItem.propTypes = {
  currentPrice: PropTypes.number,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  cartQuantity: PropTypes.number,
  _id: PropTypes.string,
  itemNo: PropTypes.string,
};

ProductCartItem.defaultProps = {
  currentPrice: 12.99,
  imageUrl: './img/salads/3.png',
  name: 'Chicken Hell',
  cartQuantity: 3,
  _id: '',
  itemNo: '',
};

export default ProductCartItem;
