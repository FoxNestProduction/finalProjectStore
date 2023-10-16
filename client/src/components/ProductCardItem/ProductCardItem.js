import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import CardContent from '@mui/material/CardContent';
import PropTypes from 'prop-types';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ColorChips from '../Chip/Chip';
import { chipSizeDishes } from '../Chip/styles';
import { sylesContainer, mediaBox, cardMedia, favoriteIcon, timeRatingBox, priceCardBox, bgRatingBox, chipBox } from './styles.js';
import { fixedEncodeURIComponent } from '../../utils/uriEncodeHelpers';
import FavouriteIcon from '../FavouriteIcon/FavouriteIcon';
import AddToCartIcon from '../addToCartIcon/addToCartIcon';

const ProductCardItem = ({ currentPrice, imageUrl, name, rating, _id }) => {
  return (
  // <Link to={`/menu/${fixedEncodeURIComponent(name)}`}>
    <Card sx={sylesContainer}>
      {/* <Box sx={mediaBox}> */}
      <CardActions disableSpacing sx={favoriteIcon}>
        <FavouriteIcon id={_id} />
        {/* <IconButton aria-label="add to favorites" sx={{ color: '#323142' }}>
          <FavoriteIcon />
        </IconButton> */}
      </CardActions>
      <Link to={`/menu/${fixedEncodeURIComponent(name)}`}>
        <Box sx={mediaBox}>
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
            <AddToCartIcon id={_id} />
          </Box>
        </CardContent>
      </Link>
    </Card>
    // </Link>
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
