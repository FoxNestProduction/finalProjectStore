import React from 'react';
import { Link } from 'react-router-dom';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import PropTypes from 'prop-types';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { useDispatch, useSelector } from 'react-redux';
import ColorChips from '../Chip/Chip';
import { stylesMiniTextWrapper, stylesMiniText, stylesTime, stylesImageWrapper, stylesImage, stylesFavoriteIcon, stylesTitle, stylesRatingWrapper, stylesPrice, stylesStarWrapper, stylesButton } from './styles.js';
import { fixedEncodeURIComponent } from '../../utils/uriEncodeHelpers';
import FavouriteIcon from '../FavouriteIcon/FavouriteIcon';
import useBreakpoint from '../../customHooks/useBreakpoint';
import { openModal, setContent } from '../../redux/slices/modalSlice';
import LoginForm from '../forms/LoginForm/LoginForm';
// eslint-disable-next-line no-underscore-dangle
const ProductCardItem = ({
  currentPrice,
  imageUrl,
  name,
  rating,
  _id,
  isTranding,
  isSupreme,
  isHealthy,
}) => {
  const breackPoint = useBreakpoint();
  const isUserAuthorized = useSelector((state) => state.authorization.isUserAuthorized);
  const dispatch = useDispatch();
  const randomNum = Math.floor(Math.random() * (59 - 29 + 1)) + 29;
  const handleOpenModalLogin = () => {
    dispatch(openModal());
    dispatch(setContent(<LoginForm />));
  };

  return (
    <>
      <CardActions
        onClick={!isUserAuthorized
          ? handleOpenModalLogin
          : null}
        sx={stylesFavoriteIcon}
      >
        <FavouriteIcon id={_id} />
      </CardActions>
      <Box>
        <Link sx={{ cursor: 'pointer' }} to={`/menu/${fixedEncodeURIComponent(name)}`}>
          <Box sx={stylesImageWrapper}>
            <CardMedia
              component="img"
              image={imageUrl}
              title={name}
              sx={stylesImage}
            />
          </Box>
          <Box sx={stylesMiniTextWrapper}>
            <ColorChips
              isHealthy={isHealthy}
              isTranding={isTranding}
              isSupreme={isSupreme}
              customStyles={stylesMiniText}
            />
          </Box>
          <Typography sx={stylesTitle} variant="h6" color="text.primary">
            {name}
          </Typography>
        </Link>
        <Box sx={stylesRatingWrapper}>
          <Typography sx={stylesTime}>
            {randomNum}
            min
          </Typography>
          <FiberManualRecordIcon sx={{ fontSize: '6px', color: 'text.secondary' }} />
          <Box sx={stylesStarWrapper}>
            <StarRateRoundedIcon color="primary" />
            <Typography>{rating}</Typography>
          </Box>
        </Box>
        <Typography sx={stylesPrice}>
          {`$${currentPrice}`}
        </Typography>
      </Box>
      <CardActions onClick={() => { console.log('add to cart'); }} sx={stylesButton}>
        {breackPoint !== 'mobile' ? (<b>ADD</b>) : null}
        <ShoppingCartCheckoutIcon />
      </CardActions>
    </>
  );
};

ProductCardItem.propTypes = {
  currentPrice: PropTypes.number,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  rating: PropTypes.number,
  _id: PropTypes.string,
  isHealthy: PropTypes.bool,
  isTranding: PropTypes.bool,
  isSupreme: PropTypes.bool,
};

ProductCardItem.defaultProps = {
  currentPrice: '',
  imageUrl: '',
  name: '',
  rating: '',
  _id: '',
  isHealthy: null,
  isTranding: null,
  isSupreme: null,
};

export default ProductCardItem;
