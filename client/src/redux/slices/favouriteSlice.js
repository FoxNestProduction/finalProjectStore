import { createSlice } from '@reduxjs/toolkit';

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
      state.favourites.push(action.payload.id);
      localStorage.setItem('favourites', JSON.stringify(state.favourites));
      state.cardStates[id] = true;
    },
    removeFavourite(state, action) {
    // eslint-disable-next-line no-underscore-dangle
      const newStateFavourites = state.favourites.filter((item) => item !== action.payload.id);
      console.log(newStateFavourites);
      state.favourites = newStateFavourites;
      localStorage.setItem('favourites', JSON.stringify(newStateFavourites));
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
