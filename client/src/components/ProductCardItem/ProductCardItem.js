import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddBoxIcon from '@mui/icons-material/AddBox';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import CardContent from '@mui/material/CardContent';
import PropTypes from 'prop-types';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ColorChips from '../Chip/Chip';
import { chipSizeDishes } from '../Chip/styles';
import { addToCart } from '../../redux/slices/cartSlice';
import { sylesContainer, mediaBox, cardMedia, favoriteIcon, timeRatingBox, priceCardBox, bgRatingBox, chipBox, cartIcons, cartIconsButton } from './styles.js';
import { fixedEncodeURIComponent } from '../../utils/uriEncodeHelpers';

const ProductCardItem = ({ currentPrice, imageUrl, name, rating, _id }) => {
  const cart = useSelector((state) => state.cart.cart.products);
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState({});
  console.log(cart);
  // console.log(selectedItem);
  const isItemInCart = cart.findIndex((product) => product.id === selectedItem.id) !== -1;
  console.log(isItemInCart);
  const handleAddToCart = (event) => {
    event.preventDefault();
    const productToCart = products.findIndex((product) => product._id === _id);
    if (productToCart !== -1) {
      const foundObject = products[productToCart];
      setSelectedItem({
        id: foundObject._id,
        currentPrice: foundObject.currentPrice,
        imageUrl: foundObject.imageUrl,
        cartQuantity: foundObject.quantity,
        name: foundObject.name,
      });
    }
    console.log(selectedItem);
    (() => dispatch(addToCart(selectedItem)))();
  };

  return (
    <Link to={`/menu/${fixedEncodeURIComponent(name)}`}>
      <Card variant="MuiCartItem" sx={sylesContainer}>
        <Box sx={mediaBox}>
          <CardActions disableSpacing sx={favoriteIcon}>
            <IconButton aria-label="add to favorites" sx={{ color: '#323142', p: '0' }}>
              <FavoriteIcon />
            </IconButton>
          </CardActions>
          <CardMedia
            component="img"
            image={imageUrl}
            title={name}
            sx={cardMedia}
          />
        </Box>
        <Box sx={chipBox}>
          <ColorChips customStyles={chipSizeDishes} />
        </Box>
        <CardContent>
          <Typography variant="h3" color="text.primary">
            {name}
          </Typography>
          <Box sx={timeRatingBox}>
            <Typography variant="body1" color="text.secondary">
              24min •
            </Typography>
            <Box sx={bgRatingBox}>
              <StarRateRoundedIcon color="primary" />
              <Typography variant="body1" color="text.secondary">
                {rating}
              </Typography>
            </Box>
          </Box>
          <Box sx={priceCardBox}>
            <Typography variant="body2" color="text.primary">
              $
              {currentPrice.toFixed(0)}
              <Typography component="span" variant="body1" color="text.secondary">
                .
                {currentPrice.toFixed(2).split('.')[1]}
              </Typography>
            </Typography>
            <IconButton aria-label="add to cart" sx={cartIconsButton} onClick={handleAddToCart}>
              { isItemInCart ? (
                <AddBoxIcon sx={cartIcons} />
              ) : (
                <ShoppingCartCheckoutIcon sx={cartIcons} />
              )}
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

ProductCardItem.propTypes = {
  currentPrice: PropTypes.number,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  rating: PropTypes.number,
  _id: PropTypes.string,
};

ProductCardItem.defaultProps = {
  currentPrice: 12.99,
  imageUrl: './img/salads/3.png',
  name: 'Chicken Hell',
  rating: 3,
  _id: '6507a306baee59670a047307',
};

export default ProductCardItem;
