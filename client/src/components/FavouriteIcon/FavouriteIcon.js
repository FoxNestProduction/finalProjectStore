import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector, useDispatch } from 'react-redux';
import { addFavourite, removeFavourite } from '../../redux/slices/favouriteSlice';

const FavouriteIcon = ({ id }) => {
  const dispatch = useDispatch();
  const isFavourite = useSelector((state) => state.favourites.cardStates[id]);
  const favor = useSelector((state) => state.favourites.favourites);
  const toggleFavourite = () => {
    if (isFavourite) {
      dispatch(removeFavourite({ id }));
    } else {
      dispatch(addFavourite({ id }));
    }
  };

  return (
    <IconButton onClick={() => toggleFavourite()}>
      <FavoriteIcon fontSize="large" sx={{ color: isFavourite ? 'secondary.main' : 'text.secondaryGray' }} />
    </IconButton>
  );
};

FavouriteIcon.propTypes = {
  id: PropTypes.string,
};

FavouriteIcon.defaultProps = {
  id: '',
};

export default FavouriteIcon;
