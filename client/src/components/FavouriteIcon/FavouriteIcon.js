import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { addFavourite, removeFavourite } from '../../redux/slices/favouriteSlice';

const FavouriteIcon = ({ id, ishovered }) => {
  const dispatch = useDispatch();
  const isFavourite = useSelector((state) => state.favourites.cardStates[id]);
  // const favor = useSelector((state) => state.favourites.favourites);
  const toggleFavourite = () => {
    if (isFavourite) {
      dispatch(removeFavourite({ id }));
    } else {
      dispatch(addFavourite({ id }));
    }
  };

  return (
    <IconButton onClick={() => toggleFavourite()} sx={{ m: 0, p: 0 }}>
      { !isFavourite
        ? <FavoriteBorderOutlinedIcon ishovered={ishovered} sx={{ color: ishovered ? 'text.primaryLight' : 'primary.main', width: '24px', height: '24px', ':hover': { color: 'text.primaryLight' } }} />
        : <FavoriteIcon sx={{ color: 'secondary.main', width: '24px', height: '24px' }} /> }
    </IconButton>
  );
};

FavouriteIcon.propTypes = {
  id: PropTypes.string,
  ishovered: PropTypes.bool,
};

FavouriteIcon.defaultProps = {
  id: '',
  ishovered: false,
};

export default FavouriteIcon;
