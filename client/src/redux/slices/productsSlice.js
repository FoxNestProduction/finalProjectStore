import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../../API/instance';
import { setLoading, setError } from '../extraReducersHelpers';
import { fetchGetPartner, fetchUpdatePartner } from './partnersSlice';
import { updateFilteredPartnerProducts, updateOneFilteredProduct } from './filterSlice';

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

export const fetchGetOneProduct = createAsyncThunk(
  'products/fetchGetOneProduct',
  async (itemNo, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/products/${itemNo}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

// ----- requests for Admin -----

export const fetchUpdateProduct = createAsyncThunk(
  'partners/fetchUpdateProduct',
  async ({ itemId, body }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await instance.put(`/products/${itemId}`, body);
      if (data.status === 'ok') {
        dispatch(updateFilteredPartnerProducts(data.product));
        dispatch(updateOneFilteredProduct(data.product));
      }
      return data.product;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const initialState = {
  products: [],
  productsQuantity: null,
  topProducts: [],
  oneProduct: null,
  allProductsNames: [],
  loading: false,
  error: null,
  editProduct: {},
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  redusers: {
    setEditProduct(state, action) {
      state.editProduct = action.payload;
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

      .addCase(fetchGetOneProduct.pending, setLoading)
      .addCase(fetchGetOneProduct.fulfilled, (state, action) => {
        state.oneProduct = action.payload;
        state.loading = false;
      })

      .addCase(fetchSortedProducts.pending, setLoading)
      .addCase(fetchSortedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.productsQuantity = action.payload.productsQuantity;
      })

      .addCase(fetchAllProductsNames.fulfilled, (state, action) => {
        state.allProductsNames = action.payload;
      })

      // ---- Admin ---
      .addCase(fetchUpdateProduct.pending, setLoading)
      .addCase(fetchUpdateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload;
        if (state.oneProduct && state.oneProduct._id === updatedProduct._id) {
          state.oneProduct = { ...state.oneProduct, ...action.payload };
        }
      })
      .addCase(fetchUpdateProduct.rejected, setError);
  },
});

export const { setEditProduct } = productsSlice.actions;

export default productsSlice.reducer;
