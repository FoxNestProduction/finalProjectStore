import { createSlice } from '@reduxjs/toolkit';
import { setUser } from './userSlice';

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
      localStorage.setItem('favourites', JSON.stringify(state.favourites));
      action.payload.forEach((id) => {
        state.cardStates[id] = true;
      });
    },
    addFavourite(state, action) {
      const { id } = action.payload;
      state.favourites.push(action.payload);
      localStorage.setItem('favourites', JSON.stringify(state.favourites));
      state.cardStates[id] = true;
    },
    removeFavourite(state, action) {
    // eslint-disable-next-line no-underscore-dangle
      state.favourites = state.favourites.filter((item) => item._id !== action.payload);
      localStorage.setItem('favourites', JSON.stringify(state.favourites));
      const { id } = action.payload;
      state.cardStates[id] = false;
    },
  },
});

export const {
  setIsFavourite,
  addFavourite,
  removeFavourite,
  setFavourite,
  isFavourite,
} = favouriteSlice.actions;

/* eslint-enable no-param-reassign */

export default favouriteSlice.reducer;
