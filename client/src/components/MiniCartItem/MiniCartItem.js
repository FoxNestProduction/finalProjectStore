import React, { memo } from 'react';
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
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  cartProductImg,
  MiniCartItemContainer,
  buttonStyles,
  quantityStyle,
  textAndQuantityCardContent,
  cardTextContent,
  productName,
  currentPriceStyles,
  buttonsWrapper,
  roundedIcons,
} from './styles';
import {
  addProductToCart,
  decreaseProductQuantity,
  addToCart,
  deleteFromCart,
  setRestaurants,
} from '../../redux/slices/cartSlice';
import { totalSumFromCartProduct } from '../Cart/cartFunctions';

const MiniCartItem = ({ _id, name, cartQuantity, currentPrice, imageUrl }) => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cart.products, shallowEqual);
  const isUserAuthorized = useSelector((state) => state.authorization.isUserAuthorized);
  const index = cartProducts.findIndex(({ product }) => product._id === _id);
  const relevantPrice = totalSumFromCartProduct(currentPrice, cartQuantity);
  const handleDeleteOne = () => {
    if (isUserAuthorized) {
      dispatch(decreaseProductQuantity(_id));
    } else if (index !== -1) {
      const foundObject = cartProducts[index];
      dispatch(deleteFromCart(foundObject));
      dispatch(setRestaurants());
    }
  };
  const handleAddOne = () => {
    if (isUserAuthorized) {
      dispatch(addProductToCart(_id));
    } else if (index !== -1) {
      const foundObject = cartProducts[index];
      dispatch(addToCart(foundObject));
      dispatch(setRestaurants());
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
        sx={textAndQuantityCardContent}
      >
        <Box
          sx={{
            alignSelf: 'center',
          }}
        >
          <CardContent
            sx={cardTextContent}
          >
            <Typography
              sx={productName}
            >
              {name}
            </Typography>
            <Typography
              sx={currentPriceStyles}
            >
              $
              {relevantPrice}
            </Typography>
          </CardContent>
        </Box>
        <Box
          sx={buttonsWrapper}
        >
          <ButtonGroup
            variant="outlined"
            aria-label="small button group"
          >
            <Button
              onClick={handleDeleteOne}
              sx={buttonStyles}
            >
              <RemoveRoundedIcon
                sx={roundedIcons}
              />
            </Button>
            <Typography
              sx={quantityStyle}
            >
              {cartQuantity}
            </Typography>
            <Button
              onClick={handleAddOne}
              sx={buttonStyles}
            >
              <AddRounded
                sx={roundedIcons}
              />
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

export default memo(MiniCartItem);
