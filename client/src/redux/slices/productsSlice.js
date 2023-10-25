import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../../API/instance';

const initialState = {
  products: [],
  topProducts: [],
  loading: 'idle', // 'idle' | 'pending' | 'succeeded' | 'failed'
  error: null,
};

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

const setError = (state, action) => {
  state.loading = 'failed';
  state.error = action.payload;
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
  extraReducers: {
    [fetchTopProducts.pending]: (state) => {
      state.loading = 'pending';
      state.error = null;
    },
    [fetchTopProducts.fulfilled]: (state, action) => {
      state.loading = 'succeeded';
      state.topProducts = action.payload;
    },
    [fetchTopProducts.rejected]: setError,
  },
});

export const { setProducts } = productsSlice.actions;

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
