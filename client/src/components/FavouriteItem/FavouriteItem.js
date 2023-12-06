import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { CardActions, CardContent, CardMedia, Rating, Button, Box, Card } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { useTranslation } from 'react-i18next';
import ColorChips from '../Chip/Chip';
import { chipForFavourite } from '../Chip/styles';
import { stylesButton, styleCardFavourite, styleMediaFavourite, styleContentFavourite } from './styles';
import FavouriteIcon from '../FavouriteIcon/FavouriteIcon';
import { fixedEncodeURIComponent } from '../../utils/uriEncodeHelpers';
import { addProductToCart } from '../../redux/slices/cartSlice';
import CustomAlert from '../Alert/Alert';
import useAlert from '../../customHooks/useAlert';

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

  const { alert, handleShowAlert, handleCloseAlert } = useAlert();
  const [favAlert, setFavAlert] = useState(false);
  const { i18n, t } = useTranslation();

  const handleAddToCart = () => {
    dispatch(addProductToCart(_id));
    handleShowAlert();
    setFavAlert(true);
    setTimeout(() => {
      handleCloseAlert();
      setFavAlert(false);
    }, 4000);
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
          {t('favourites.addToCart')}
          <AddBoxOutlinedIcon
            fontSize="small"
            sx={{ ml: 1 }}
          />
        </Button>
      </CardActions>
      <CardActions sx={{ position: 'absolute', top: '0', right: '0' }}>
        <FavouriteIcon id={_id} />
      </CardActions>
      {favAlert && alert && (
        <CustomAlert type="success" handleCloseAlert={handleCloseAlert} content="Your dish in Cart!" />
      )}
    </Card>
  );
};

FavouriteItem.propTypes = {
  product: PropTypes.object,
};
FavouriteItem.defaultProps = {
  product: {},
};

export default memo(FavouriteItem);
