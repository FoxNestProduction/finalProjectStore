import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../../API/instance';
import { setLoading, setError } from '../extraReducersHelpers';

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

export const fetchAllProductsNames = createAsyncThunk(
  'products/fetchAllProductsNames',
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get('/products/names');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const getOneProduct = createAsyncThunk(
  'products/getOneProduct',
  async (itemNo, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/products/${itemNo}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const initialState = {
  products: [],
  productsQuantity: null,
  topProducts: [],
  oneProduct: {},
  allProductsNames: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopProducts.pending, setLoading)
      .addCase(fetchTopProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.topProducts = action.payload;
      })
      .addCase(fetchTopProducts.rejected, setError)
      .addCase(getOneProduct.fulfilled, (state, action) => {
        state.oneProduct = action.payload;
      })
      .addCase(fetchSortedProducts.pending, setLoading)
      .addCase(fetchSortedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.productsQuantity = action.payload.productsQuantity;
      })
      .addCase(fetchAllProductsNames.fulfilled, (state, action) => {
        state.allProductsNames = action.payload;
      });
  },
});

export default productsSlice.reducer;
