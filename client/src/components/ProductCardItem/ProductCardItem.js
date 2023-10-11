import React from 'react';
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
import ColorChips from '../Chip/Chip';
import { chipSizeDishes } from '../Chip/styles';
import { sylesContainer, mediaBox, cardMedia, favoriteIcon, timeRatingBox, priceCardBox, bgRatingBox, chipBox } from './styles.js';
import { fixedEncodeURIComponent } from '../../utils/uriEncodeHelpers';

const ProductCardItem = ({ price, imageUrl, name, rating, id, setCartItems }) => {
  const isMobile = useMediaQuery('(max-width: 480px)');
  const isTablet = useMediaQuery('(min-width: 481px) and (max-width: 992px)');
  const isDesktop = useMediaQuery('(min-width: 993px)');
  const handleAddToCart = (event) => {
    event.preventDefault();
    setCartItems((prev) => {
      // console.log(prev);
      const newCartState = [...prev];
      // console.log(newCartState);
      const index = newCartState.findIndex((item) => item.id === id);
      console.log(index);
      if (index !== -1) {
        newCartState[index].count++;

        // saveStateToLocalStorage(CART_LS_KEY, newCartState);
        return newCartState;
      }
      const newState = [{ name, price, id, count: 1 }, ...prev];
      // saveStateToLocalStorage(CART_LS_KEY, newState);
      return newCartState;
    });
  };

  return (
    <Link to={`/menu/${fixedEncodeURIComponent(name)}`}>
      <Card sx={sylesContainer}>
        <Box sx={mediaBox}>
          <CardActions disableSpacing sx={favoriteIcon}>
            <IconButton aria-label="add to favorites" sx={{ color: '#323142' }}>
              <FavoriteIcon />
            </IconButton>
          </CardActions>
          <CardMedia
            component="img"
            image={imageUrl}
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
              {price.toFixed(0)}
              <Typography component="span" variant="body1" color="text.secondary">
                .
                {price.toFixed(2).split('.')[1]}
              </Typography>
            </Typography>
            <IconButton aria-label="add to cart" sx={{ color: '#323142' }} onClick={handleAddToCart}>
              <AddBoxIcon sx={{ fontSize: isMobile ? '20px' : isTablet ? '25px' : '30px' }} />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

ProductCardItem.propTypes = {
  price: PropTypes.number,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  rating: PropTypes.number,
  id: PropTypes.string,
  setCartItems: PropTypes.func,
};

ProductCardItem.defaultProps = {
  price: 12.99,
  imageUrl: './img/salads/3.png',
  name: 'Chicken Hell',
  rating: 3,
  id: '6507a306baee59670a047307',
  setCartItems: () => { },
};

export default ProductCardItem;
