import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { CardActions, CardContent, CardMedia, Rating, Button, Box, Card } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import ColorChips from '../Chip/Chip';
import { chipForFavourite } from '../Chip/styles';
import { stylesButton, styleCardFavourite, styleMediaFavourite, styleContentFavourite } from './styles';
import FavouriteIcon from '../FavouriteIcon/FavouriteIcon';
import { fixedEncodeURIComponent } from '../../utils/uriEncodeHelpers';
import { addProductToCart } from '../../redux/slices/cartSlice';

const FavouriteItem = ({ product }) => {
  const dispatch = useDispatch();

  const {
    name,
    itemNo,
    currentPrice,
    isTrending,
    rating,
    imageUrl,
    isSupreme,
    isHealthy,
    _id,
  } = product;

  const isFavourite = useSelector((state) => state.favourites.cardStates[_id]);

  const handleAddToCart = () => {
    dispatch(addProductToCart(_id));
  };

  return (
    <Card sx={styleCardFavourite}>
      <Link to={`/menu/${fixedEncodeURIComponent(name)}/${itemNo}`}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: '900px' }}>
          <CardMedia
            component="img"
            width="fit content"
            height="100%"
            image={imageUrl}
            sx={styleMediaFavourite}
          />
          <CardContent sx={styleContentFavourite}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <Typography variant="h3" sx={{ p: 0, mb: 1 }}>{name}</Typography>
              <ColorChips
                isTrending={isTrending}
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
      </Link>
      <CardActions sx={{ alignItems: 'flex-end', p: 0, minWidth: '130px' }}>
        <Button
          onClick={handleAddToCart}
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
        <FavouriteIcon id={_id} />
        {/* <FavouriteIcon product={product} /> */}
      </CardActions>
    </Card>
  );
};

FavouriteItem.propTypes = {
  product: PropTypes.object,
};
FavouriteItem.defaultProps = {
  product: {},
};

export default FavouriteItem;
