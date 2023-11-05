import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../../API/instance';
import { setLoading, setError } from '../extraReducersHelpers';
import { fetchFilteredProducts } from './filterSlice';

export const fetchTopProducts = createAsyncThunk(
  'products/fetchTopProducts',
  async (count, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/products/filter?perPage=${count}&sort=-rating`);
      return response.data.products;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const fetchSortedProducts = createAsyncThunk(
  'products/fetchSortedProducts',
  async (queryString, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/products/filter${queryString}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const getAllProductsNames = () => async (dispatch) => {
  try {
    const { data } = await instance.get('/products/names');
    dispatch(setAllProductsNames(data)); // eslint-disable-line
  } catch (error) {
    console.log('%cError loading allProductsNames:', 'color: red; font-weight: bold;', error);
  }
};

const initialState = {
  products: [],
  productsQuantity: null,
  topProducts: [],
  allProductsNames: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setAllProductsNames(state, action) {
      state.allProductsNames = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopProducts.pending, setLoading)
      .addCase(fetchTopProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.topProducts = action.payload;
      })
      .addCase(fetchTopProducts.rejected, setError)
      .addCase(fetchSortedProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.productsQuantity = action.payload.productsQuantity;
        // state.pagesQuantity = Math.ceil(
        //   action.payload.productsQuantity / state.filterParams.perPage,
        // );
      });
    // .addCase(fetchAllProductsNames.fulfilled, (state, action) => {
    //   state.allProductsNames = action.payload.allProductsNames;
    // });
  },
});

export const { setProducts, setAllProductsNames } = productsSlice.actions;

// todo: видалити, коли всі дані будуть завантажуватись через asyncThunk/локально в компонентах
export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await instance.get('/products');
    dispatch(setProducts(data));
  } catch (error) {
    console.log('Error loading products:', error);
  }
};

export const allProducts = (state) => state.products.products;

export default productsSlice.reducer;
