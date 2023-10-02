import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

/* eslint-disable no-param-reassign */

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
});

export const {
  setProducts,
} = productsSlice.actions;

/* eslint-enable no-param-reassign */

export default productsSlice.reducer;
