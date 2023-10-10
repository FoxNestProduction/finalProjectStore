import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { setUser } from './userSlice';
import { setAuthorizationError } from './errorSlice';

const initialState = {
  favourites: [],
  cardStates: {},
};

/* eslint-disable no-param-reassign */
const favouriteSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    setFavourite(state, action) {
      state.favourites = action.payload;
      // localStorage.setItem('favourites', JSON.stringify(state.favourites));
      action.payload.forEach((id) => {
        state.cardStates[id] = true;
      });
    },
    addFavourite(state, action) {
      const { id } = action.payload;
      state.favourites.push(action.payload.id);
      // localStorage.setItem('favourites', JSON.stringify(state.favourites));
      state.cardStates[id] = true;
    },
    removeFavourite(state, action) {
    // eslint-disable-next-line no-underscore-dangle
      const { id } = action.payload;
      const newStateFavourites = state.favourites.filter((item) => item !== action.payload.id);
      state.favourites = newStateFavourites;
      // localStorage.setItem('favourites', JSON.stringify(newStateFavourites));
      state.cardStates[id] = false;
    },
    updateFavourites(state, action) {
      state.favourites = action.payload;
    },
  },
});

export const {
  setIsFavourite,
  addFavourite,
  removeFavourite,
  setFavourite,
  isFavourite,
  updateFavourites,
} = favouriteSlice.actions;

export const updateUserData = () => async (dispatch, getState) => {
  try {
    const { authorization, favourites } = getState();
    const { token } = authorization;
    const { updatedFavourites } = favourites;
    const response = await axios.put('http://localhost:4000/api/customers', { favourites: updatedFavourites }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    console.log(response);
    if (response) {
      dispatch(updateFavourites(updatedFavourites));
      dispatch(setFavourite(updatedFavourites));
    } else {
      // dispatch(setAuthorizationError());
    }
  } catch (error) {
    console.error('Помилка при оновленні даних користувача:', error);
    // dispatch(setAuthorizationError());
  }
};

/* eslint-enable no-param-reassign */

export default favouriteSlice.reducer;
