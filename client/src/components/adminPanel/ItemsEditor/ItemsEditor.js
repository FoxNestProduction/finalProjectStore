import React, { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import PropTypes from 'prop-types';
import { Card, CardContent, Container } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import useBreakpoint from '../../../customHooks/useBreakpoint';
import useAlert from '../../../customHooks/useAlert';
import { openModal, setContent } from '../../../redux/slices/modalSlice';
import LoginForm from '../../forms/LoginForm/LoginForm';
import { addProductToCart, addToCart, setRestaurants } from '../../../redux/slices/cartSlice';
import { getOneProduct } from '../../../redux/slices/productsSlice';
import FavouriteIcon from '../../FavouriteIcon/FavouriteIcon';
import { fixedEncodeURIComponent } from '../../../utils/uriEncodeHelpers';
import ColorChips from '../../Chip/Chip';
import CustomAlert from '../../Alert/Alert';
import { btnDisable, card, cardImg, formWrapper, infoWrapper } from './styles';
import EditIcon from '../../../assets/svgComponents/EditIcon';
import PartnerEditForm from '../PartnerEditForm/PartnerEditForm';

// ItemsEditor
const ItemsEditor = () => {
  const item = {
    _id: '657242011827208846e79587',
    name: 'Welcome Pizzeria',
    description: "Delicious dishes from Italian cuisine: a culinary journey that transports your taste buds to the heart of Italy. Indulge in a symphony of flavors, where every bite is a celebration of tradition, passion, and craftsmanship. Our chefs, true artisans of their craft, painstakingly create each dish to embody the essence of Italy's rich gastronomic heritage.",
    isBookmark: false,
    isHealthy: false,
    rating: {
      $numberInt: '4',
    },
    filterCategories: 'pizza',
    address: '123 Main Street',
    imageUrl: 'https://res.cloudinary.com/dvtjgmpnr/image/upload/c_scale,w_650/v1696613466/EatlyProject/restaurants/welcome_pizzeria_hgfw99.png',
    enabled: true,
    isSupreme: true,
    isTrending: true,
    customId: '17001',
  };

  return (
    <Card sx={card}>
      <CardActions sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '4%',
        p: '0',
        mb: '23px',
      }}
      >
        <Button
          type="button"
          variant="outlined"
          size="small"
          sx={btnDisable}
        >
          Disable
        </Button>
        <IconButton
          sx={{
            bgcolor: 'background.footer',
          }}
        >
          <EditIcon />
        </IconButton>
      </CardActions>
      <Box sx={infoWrapper}>
        <CardMedia
          component="img"
          src={item.imageUrl}
          alt={item.name}
          sx={cardImg}
        />
        <Box sx={formWrapper}>
          <PartnerEditForm restaurant={item} />
        </Box>
      </Box>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  // <>
  //   <CardActions
  //     onClick={() => {}}
  //     sx={stylesFavoriteIcon}
  //   />
  //   <Box>
  //     <Link sx={{ cursor: 'pointer' }} to={`/menu/${fixedEncodeURIComponent(name)}/${itemNo}`}>
  //       <Box sx={stylesImageWrapper}>
  //         <CardMedia
  //           component="img"
  //           image={imageUrl}
  //           title={name}
  //           sx={stylesImage}
  //         />
  //       </Box>
  //       <Box sx={stylesMiniTextWrapper}>
  //         <ColorChips
  //           isHealthy={isHealthy}
  //           isTrending={isTrending}
  //           isSupreme={isSupreme}
  //           customStyles={stylesMiniText}
  //         />
  //       </Box>
  //       <Typography sx={stylesTitle} variant="h6" color="text.primary">
  //         {name}
  //       </Typography>
  //     </Link>
  //     <Box sx={stylesRatingWrapper}>
  //       <Typography sx={stylesTime}>
  //         {randomNum}
  //         min
  //       </Typography>
  //       <FiberManualRecordIcon sx={{ fontSize: '6px', color: 'text.secondary' }} />
  //       <Box sx={stylesStarWrapper}>
  //         <StarRateRoundedIcon color="primary" />
  //         <Typography>{rating}</Typography>
  //       </Box>
  //     </Box>
  //     <Typography sx={stylesPrice}>
  //       {`$${currentPrice}`}
  //     </Typography>
  //   </Box>
  //   <CardActions onClick={handleAddToCart} sx={stylesButton}>
  //     {breakPoint !== 'mobile' ? (<b>ADD</b>) : null}
  //     <ShoppingCartCheckoutIcon />
  //   </CardActions>
  // </>
  );
};
//
ItemsEditor.propTypes = {
//   imageUrl: PropTypes.string,
//   name: PropTypes.string,
//   rating: PropTypes.number,
//   _id: PropTypes.string,
//   isHealthy: PropTypes.bool,
//   isTrending: PropTypes.bool,
//   isSupreme: PropTypes.bool,
//   itemNo: PropTypes.string,
//   randomNum: PropTypes.number,
};

ItemsEditor.defaultProps = {
//   imageUrl: '',
//   name: '',
//   rating: null,
//   _id: '',
//   isHealthy: false,
//   isTrending: false,
//   isSupreme: false,
//   itemNo: '',
//   randomNum: 24,
};

export default memo(ItemsEditor);
