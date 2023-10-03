import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  dish: {},
};

/* eslint-disable no-param-reassign */

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setOneDish(state, action) {
      state.dish = state.products.find((elem) => elem.name === action.payload);
    },
  },
});

export const {
  setProducts,
  setOneDish,
} = productsSlice.actions;

/* eslint-enable no-param-reassign */

export default productsSlice.reducer;
