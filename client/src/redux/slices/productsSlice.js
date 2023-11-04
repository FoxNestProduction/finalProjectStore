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

export const GetOneProduct = createAsyncThunk(
  'products/GetOneProduct',
  async (itemNo, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/products/${itemNo}`);
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  },
);

const initialState = {
  products: [],
  topProducts: [],
  oneProduct: {},
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
    resetOneProduct(state, action = {}) {
      state.products = action.payload;
    },
  },
  extraReducers: {
    [fetchTopProducts.pending]: setLoading,
    [fetchTopProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.topProducts = action.payload;
    },
    [fetchTopProducts.rejected]: setError,
    [GetOneProduct.pending]: setLoading,
    [GetOneProduct.fulfilled]: (state, action) => {
      state.oneProduct = action.payload;
    },
    [GetOneProduct.rejected]: setError,
  },
});

export const { setProducts, resetOneProduct } = productsSlice.actions;

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
