import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { addFavourite, removeFavourite } from '../../redux/slices/favouriteSlice';

const FavouriteIcon = ({ id, ishovered, isactive }) => {
  const dispatch = useDispatch();
  const isFavourite = useSelector((state) => state.favourites.cardStates[id]);
  const favourites = useSelector((state) => state.favourites.favorites);
  const toggleFavourite = () => {
    if (isFavourite) {
      dispatch(removeFavourite({ id }));
    } else {
      dispatch(addFavourite({ id }));
    }
  };

  const token = useSelector((state) => state.authorization.token);
  useEffect(() => {
    const updateUser = () => async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: token,
        };
        const response = await axios.put('http://localhost:4000/api/customers', favourites, { headers });
        // console.log(response.data);
        // console.log(token);
      } catch (error) {
        console.error('Помилка при оновленні даних користувача:', error);
      }
    };
    updateUser();
  }, [token, favourites, dispatch]);

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
              '&:hover': { color: 'text.primaryLight' },
              '&:active': { color: 'primary.main' },
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
