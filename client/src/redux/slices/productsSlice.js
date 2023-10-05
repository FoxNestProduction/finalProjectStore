import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
};

/* eslint-disable no-param-reassign */

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) { // eslint-disable-line no-shadow
      state.products = action.payload;
    },
  },
});

export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get('http://localhost:4000/api/products');
    console.log(data);
    console.log('hello');
    dispatch(setProducts(data));// eslint-disable-line no-use-before-define
  } catch (error) {
    console.log('Error loading products:', error);
  }
};

export const { setProducts } = productsSlice.actions;

/* eslint-enable no-param-reassign */

export default productsSlice.reducer;
