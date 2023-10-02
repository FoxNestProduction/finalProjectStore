import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import { Box, Stack, useMediaQuery } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddBoxIcon from '@mui/icons-material/AddBox';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import CardContent from '@mui/material/CardContent';
import { PropTypes } from 'prop-types';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ColorChips from '../Chip/Chip';
import { chipSizeDishes } from '../Chip/styles';
import { sylesContainer, mediaBox, cardMedia, favoriteIcon, timeRatingBox, priceCardBox, bgRatingBox } from './styles.js';

const ProductCardItem = ({ price, imageUrl, name, rating }) => {
  const isMobile = useMediaQuery('(max-width: 480px)');
  const isTablet = useMediaQuery('(min-width: 481px) and (max-width: 992px)');
  const isDesktop = useMediaQuery('(min-width: 993px)');
  return (
    <Card sx={sylesContainer}>
      <Box sx={mediaBox}>
        <CardActions disableSpacing sx={favoriteIcon}>
          <IconButton aria-label="add to favorites" sx={{ color: '#323142' }}>
            <FavoriteIcon />
          </IconButton>
        </CardActions>
        <CardMedia
          component="img"
          sx={cardMedia}
          image={imageUrl}
          title="green iguana"
        />
      </Box>
      <ColorChips customStyles={chipSizeDishes} />
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
          <IconButton aria-label="add to cart" sx={{ color: '#323142' }}>
            <AddBoxIcon sx={{ fontSize: isMobile ? '20px' : isTablet ? '25px' : '30px' }} />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

ProductCardItem.propTypes = {
  price: PropTypes.number,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  rating: PropTypes.number,
};

ProductCardItem.defaultProps = {
  price: 12.99,
  imageUrl: './img/salads/3.png',
  name: 'Chicken Hell',
  rating: 3,
};

export default ProductCardItem;
