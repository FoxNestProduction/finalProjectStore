import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../../API/instance';
import { resetSearch, setInputSearchValue, setSearch } from './searchSlice';
import { setError, setLoading } from '../extraReducersHelpers';

export const fetchFilteredProducts = createAsyncThunk(
  'filter/fetchFilteredProducts',
  async (queryString, { rejectWithValue, dispatch }) => {
    try {
      const response = await instance.get(`/products/filter${queryString}`);
      if (response.data.products.length > 0) {
        // dispatch(setSearch([]));
        // dispatch(setInputSearchValue(''));
        dispatch(resetSearch());
      }
      console.log(response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const initialState = {
  filteredProducts: [],
  productsQuantity: null,
  loading: false,
  error: null,
  nothingFound: false,
  filterParams: {
    filterCategories: [],
    isTrending: false,
    rating: null, // mostPopular
    isHealthy: false,
    isSupreme: false,
    minPrice: 0,
    maxPrice: 30,
    sort: '',
    startPage: 1,
    perPage: 10,
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilteredProducts(state, action) {
      state.filteredProducts = action.payload;
    },
    setProductsQuantity(state, action) {
      state.productsQuantity = action.payload;
    },
    setNothingFound(state, action) {
      state.nothingFound = action.payload;
    },
    setFilterParams(state, action) {
      console.log('action.payload', action.payload);
      const newState = { ...state.filterParams, ...action.payload };
      console.log('newState', newState);
      state.filterParams = newState;
      // state.filterParams = { ...state.filterParams, ...action.payload };
    },
    resetFilter(state) {
      state.filteredProducts = [];
      state.productsQuantity = null;
      state.nothingFound = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredProducts.pending, setLoading)
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        if (action.payload.length === 0) {
          state.filteredProducts = [];
          state.nothingFound = true;
        } else {
          state.filteredProducts = action.payload.products;
          state.productsQuantity = action.payload.productsQuantity;
          state.nothingFound = false;
        }
        state.loading = false;
      })
      .addCase(fetchFilteredProducts.rejected, setError);
  },
});

export const { setFilteredProducts, setFilterParams,
  setNothingFound, setProductsQuantity, resetFilter } = filterSlice.actions;

export default filterSlice.reducer;
