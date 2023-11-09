import React, { useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import { Button, CardMedia, IconButton, Typography } from '@mui/material';
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
  buttonsWrapper,
  imageWrapper,
  closeBtn,
  closeIcon,
} from './styles';

const ProductCartItem = ({ _id, itemNo, name, cartQuantity, currentPrice, imageUrl }) => {
  const cartProducts = useSelector((state) => state.cart.cart.products);
  const dispatch = useDispatch();
  const index = cartProducts.findIndex(({ product }) => product._id === _id);
  const finallySumOfCartProduct = totalSumFromCartProduct(currentPrice, cartQuantity);
  const handleDeleteOne = useCallback(() => {
    if (index !== -1) {
      const foundObject = cartProducts[index];
      (() => dispatch(deleteFromCart(foundObject)))();
    }
  }, [cartProducts, dispatch, index]);
  const handleAddOne = useCallback(() => {
    if (index !== -1) {
      const foundObject = cartProducts[index];
      (() => dispatch(addOneMore(foundObject)))();
    }
  }, [cartProducts, dispatch, index]);
  const handleDeleteFullProduct = useCallback(() => {
    if (index !== -1) {
      const foundObject = cartProducts[index];
      dispatch(deleteFullProduct(foundObject));
    }
  }, [cartProducts, dispatch, index]);
  return (
    <Card sx={cartIconContainer}>
      <Box sx={linkContainer}>
        <Box
          sx={imageWrapper}
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
        sx={buttonsWrapper}
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
        sx={closeBtn}
      >
        <CloseRoundedIcon
          fontSize="small"
          sx={closeIcon}
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

export default memo(ProductCartItem);
