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
import FavouriteIcon from '../FavouriteIcon/FavouriteIcon';

// eslint-disable-next-line no-underscore-dangle
const ProductCardItem = ({ currentPrice, imageUrl, name, rating, _id }) => {
  const isMobile = useMediaQuery('(max-width: 480px)');
  const isTablet = useMediaQuery('(min-width: 481px) and (max-width: 992px)');
  const isDesktop = useMediaQuery('(min-width: 993px)');

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
            sx={cardMedia}
            image={imageUrl}
            title={name}
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
            <IconButton aria-label="add to cart" sx={{ color: '#323142' }}>
              <AddBoxIcon sx={{ fontSize: isMobile ? '20px' : isTablet ? '25px' : '30px' }} />
            </IconButton>
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
  currentPrice: '',
  imageUrl: '',
  name: '',
  rating: '',
  _id: '',
};

export default ProductCardItem;
