import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { CardActions, CardContent, CardMedia, Rating, Button, Box, Card } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IconButton from '@mui/material/IconButton';
import ColorChips from '../Chip/Chip';
import { chipForFavourite } from '../Chip/styles';
import { stylesButton, styleCardFavourite, styleMediaFavourite, styleContentFavourite } from './styles';

const FavouriteItem = ({ favourite }) => {
  const products = useSelector((state) => state.products.products, shallowEqual);

  // eslint-disable-next-line no-underscore-dangle
  const dish = products.find((item) => (item._id) === favourite);

  const {
    name,
    currentPrice,
    isTranding,
    rating,
    imageUrl,
    isSupreme,
    isHealthy,
  } = dish;

  return (
    <Card sx={styleCardFavourite}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <CardMedia
          component="img"
          width="auto"
          height="100%"
          image={imageUrl}
          sx={styleMediaFavourite}
        />
        <CardContent sx={styleContentFavourite}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <Typography variant="h3" sx={{ p: 0, mb: 1 }}>{name}</Typography>
            <ColorChips
              isTranding={isTranding}
              isSupreme={isSupreme}
              isHealthy={isHealthy}
              customStyles={chipForFavourite}
            />
            <Rating name="half-rating" size="small" value={rating} readOnly sx={{ color: 'primary.main' }} />
          </Box>
          <Box>
            <Typography
              variant="h3"
            >
              $
              {currentPrice}
            </Typography>
          </Box>
        </CardContent>
      </Box>
      <CardActions sx={{ alignItems: 'flex-end', p: 0 }}>
        <Button
          variant="outline"
          fontSize="medium"
          sx={stylesButton}
        >
          Add To Cart
          <AddBoxOutlinedIcon
            fontSize="small"
            sx={{ ml: 1 }}
          />
        </Button>
      </CardActions>
      <CardActions sx={{ position: 'absolute', top: '0', right: '0' }}>
        <IconButton>
          <FavoriteIcon fontSize="large" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

FavouriteItem.propTypes = {
  favourite: PropTypes.string.isRequired,
};

export default FavouriteItem;
