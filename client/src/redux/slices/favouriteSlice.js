import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isFavourite: false,
};

/* eslint-disable no-param-reassign */

const favouriteSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    setIsFavourite(state) {
      state.isFavourite = true;
    },
  },
});

export const { setIsFavourite } = favouriteSlice.actions;

/* eslint-enable no-param-reassign */

export default favouriteSlice.reducer;
