import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { addFavourite, removeFavourite, updateFavourites } from '../../redux/slices/favouriteSlice';

const FavouriteIcon = ({ id, ishovered, isactive }) => {
  const dispatch = useDispatch();
  const isFavourite = useSelector((state) => state.favourites.cardStates[id]);
  const wishlist = useSelector((state) => state.favourites.favourites);
  const token = useSelector((state) => state.authorization.token);

  const toggleFavourite = () => {
    if (token && !ishovered) {
      if (isFavourite) {
        dispatch(removeFavourite({ id }));
      } else {
        dispatch(addFavourite({ id }));
      }
    }
  };

  // useEffect(() => {
  //   dispatch(updateFavourites(wishlist));
  // }, [dispatch, wishlist]);

  return (
    <IconButton onClick={() => toggleFavourite()} sx={{ m: 0, p: 0 }}>
      { !isFavourite
        ? (
          <FavoriteBorderOutlinedIcon
            ishovered={ishovered.toString()}
            isactive={isactive.toString()}
            sx={{
              color: isactive ? 'primary.main' : (ishovered ? 'text.primaryLight' : 'text.header'),
              width: '24px',
              height: '24px',
              '&:hover': { color: 'secondary.main' },
              '&:active': { color: 'secondary.hover' },

            }}
          />
        )
        : <FavoriteIcon sx={{ color: 'secondary.main', width: '24px', height: '24px' }} /> }
    </IconButton>
  );
};

FavouriteIcon.propTypes = {
  id: PropTypes.string,
  ishovered: PropTypes.bool,
  isactive: PropTypes.bool,
};

FavouriteIcon.defaultProps = {
  id: '',
  ishovered: false,
  isactive: false,
};

export default FavouriteIcon;
