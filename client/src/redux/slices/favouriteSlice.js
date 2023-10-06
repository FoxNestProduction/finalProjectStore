import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
};

/* eslint-disable no-param-reassign */

const favouriteSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    setFavourite(state, action) { // eslint-disable-line no-shadow
      state.items = action.payload;
    },
  },
});

export const getFavourite = () => async (dispatch) => {
  try {
    const { data } = await axios.get('http://localhost:4000/api/wishlist');
    console.log(data);
    dispatch(setFavourite(data));// eslint-disable-line no-use-before-define
  } catch (error) {
    console.log('Error loading favourites products:', error);
  }
};

export const { setFavourite } = favouriteSlice.actions;

/* eslint-enable no-param-reassign */

export default favouriteSlice.reducer;
