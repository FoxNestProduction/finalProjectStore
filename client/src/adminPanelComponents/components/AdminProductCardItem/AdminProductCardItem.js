import React, { useState, useEffect, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import PropTypes from 'prop-types';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import ColorChips from '../../../components/Chip/Chip';
import {
  stylesMiniTextWrapper,
  stylesMiniText,
  stylesTime,
  stylesImageWrapper,
  stylesImage,
  stylesFavoriteIcon,
  stylesTitle,
  stylesRatingWrapper,
  stylesPrice,
  stylesStarWrapper,
  stylesButton,
  stylesDisableBtn,
} from './styles.js';
import { fixedEncodeURIComponent } from '../../../utils/uriEncodeHelpers';
import FavouriteIcon from '../../../components/FavouriteIcon/FavouriteIcon';
import useBreakpoint from '../../../customHooks/useBreakpoint';
import { openModal, setContent } from '../../../redux/slices/modalSlice';
import LoginForm from '../../../components/forms/LoginForm/LoginForm';
import { addToCart, addProductToCart, setRestaurants } from '../../../redux/slices/cartSlice';
import useAlert from '../../../customHooks/useAlert';
import CustomAlert from '../../../components/Alert/Alert';
import { fetchGetOneProduct } from '../../../redux/slices/productsSlice';
import DisableBtn from '../DisableBtn/DisableBtn.js';
// eslint-disable-next-line no-underscore-dangle

const AdminProductCardItem = (item) => {
  const {
    currentPrice,
    imageUrl,
    name,
    rating,
    _id,
    isTrending,
    isSupreme,
    isHealthy,
    itemNo,
    randomNum,
  } = item;
  // console.log(item);
  const breakPoint = useBreakpoint();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  // console.log(pathname);

  const isUserAuthorized = useSelector((state) => state.authorization.isUserAuthorized);
  // const randomNum = Math.floor(Math.random() * (59 - 29 + 1)) + 29;

  const { alert, handleCloseAlert, handleShowAlert } = useAlert();
  const [clickedAdd, setClickedAdd] = useState(false);

  // const handleOpenModalLogin = () => {
  //   dispatch(openModal());
  //   dispatch(setContent(<LoginForm />));
  // };

  useEffect(() => {
    if (clickedAdd) {
      handleShowAlert();
      setTimeout(() => {
        setClickedAdd(false);
      }, 4000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedAdd]);

  // const handleAddToCart = (event) => {
  //   event.preventDefault();
  //   const onGetOneProductComplete = (oneProduct) => {
  //     if (Object.keys(oneProduct).length !== 0) {
  //       const selectedItem = {
  //         product: { ...oneProduct },
  //         cartQuantity: 1,
  //       };
  //       if (isUserAuthorized) {
  //         dispatch(addProductToCart(selectedItem.product._id));
  //       } else {
  //         dispatch(addToCart(selectedItem));
  //         dispatch(setRestaurants());
  //       }
  //     }
  //   };

  //   dispatch(fetchGetOneProduct(itemNo)).then((action) => {
  //     if (fetchGetOneProduct.fulfilled.match(action)) {
  //       onGetOneProductComplete(action.payload);
  //       setClickedAdd(true);
  //     }
  //   });
  // };
  return (
    <>
      {/* <CardActions
        onClick={!isUserAuthorized
          ? handleOpenModalLogin
          : null}
        sx={stylesFavoriteIcon}
      >
        <FavouriteIcon id={_id} />
      </CardActions> */}
      <Box>
        <Link sx={{ cursor: 'pointer' }} to={`${pathname}/dishes/${itemNo}`}>
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
              isTrending={isTrending}
              isSupreme={isSupreme}
              customStyles={stylesMiniText}
            />
          </Box>
          <Typography sx={stylesTitle} variant="h6" color="text.primary">
            {name}
          </Typography>
        </Link>
        {/* <Box sx={stylesRatingWrapper}>
          <Typography sx={stylesTime}>
            {randomNum}
            min
          </Typography>
          <FiberManualRecordIcon sx={{ fontSize: '6px', color: 'text.secondary' }} />
          <Box sx={stylesStarWrapper}>
            <StarRateRoundedIcon color="primary" />
            <Typography>{rating}</Typography>
          </Box>
        </Box> */}
        <Typography sx={stylesPrice}>
          {`$${currentPrice}`}
        </Typography>
      </Box>
      {/* <CardActions onClick={handleAddToCart} sx={stylesButton}>
        {breakPoint !== 'mobile' ? (<b>ADD</b>) : null}
        <ShoppingCartCheckoutIcon />
      </CardActions> */}

      <DisableBtn item={item} type="dish" customStyles={stylesDisableBtn} />

      {clickedAdd && alert && (
        <CustomAlert type="success" handleCloseAlert={handleCloseAlert} content="Your dish in Cart!" />
      )}
    </>
  );
};

AdminProductCardItem.propTypes = {
  // item: PropTypes.object,
  // currentPrice: PropTypes.number,
  // imageUrl: PropTypes.string,
  // name: PropTypes.string,
  // rating: PropTypes.number,
  // _id: PropTypes.string,
  // isHealthy: PropTypes.bool,
  // isTrending: PropTypes.bool,
  // isSupreme: PropTypes.bool,
  // itemNo: PropTypes.string,
  // randomNum: PropTypes.number
};

AdminProductCardItem.defaultProps = {
  // item: {},
  // currentPrice: null,
  // imageUrl: '',
  // name: '',
  // rating: null,
  // _id: '',
  // isHealthy: false,
  // isTrending: false,
  // isSupreme: false,
  // itemNo: '',
  // randomNum: 24,
  // admin: false,
};

export default memo(AdminProductCardItem);
