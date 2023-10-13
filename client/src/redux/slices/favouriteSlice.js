import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { setAuthorizationError } from './errorSlice';

const initialState = {
  favourites: [],
  cardStates: {},
};

const favouriteSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    setFavourite(state, action) {
      state.favourites = action.payload;
      action.payload.forEach((id) => {
        state.cardStates[id] = true;
      });
    },
    addFavourite(state, action) {
      const { id } = action.payload;
      state.favourites.push(action.payload.id);
      state.cardStates[id] = true;
    },
    removeFavourite(state, action) {
    // eslint-disable-next-line no-underscore-dangle
      const { id } = action.payload;
      const newStateFavourites = state.favourites.filter((item) => item !== action.payload.id);
      state.favourites = newStateFavourites;
      state.cardStates[id] = false;
    },
    updateFavourites(state, action) {
      state.favourites = action.payload;
    },
  },
});

export const {
  addFavourite,
  removeFavourite,
  setFavourite,
  isFavourite,
  updateFavourites,
} = favouriteSlice.actions;

export default favouriteSlice.reducer;
