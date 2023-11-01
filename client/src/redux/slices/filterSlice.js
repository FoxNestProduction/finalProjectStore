import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../../API/instance';
import { setInputSearchValue, setSearch } from './searchSlice';
import { setError, setLoading } from '../extraReducersHelpers';

export const fetchFilteredProducts = createAsyncThunk(
  'filter/fetchFilteredProducts',
  async (queryString, { rejectWithValue, dispatch }) => {
    try {
      const response = await instance.get(`/products/filter${queryString}`);
      if (response.data.products.length > 0) {
        dispatch(setSearch([]));
        dispatch(setInputSearchValue(''));
      }
      return response.data.products;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const initialState = {
  filteredProducts: [],
  loading: false,
  error: null,
  nothingFound: false,
  filterParams: {
    filterCategories: [],
    isTrending: false,
    rating: null, // mostPopular
    isHealthy: false,
    isSupreme: false,
    minPrice: 0, // задала дефолтні значення, так як при першому
    maxPrice: 30, // завантаженні обидва бігунка на позиції 0
    sort: '',
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilteredProducts(state, action) {
      state.filteredProducts = action.payload;
    },
    setFilterParams(state, action) {
      console.log('action.payload', action.payload);
      const newState = { ...state.filterParams, ...action.payload };
      console.log('newState', newState);
      // state.filterParams.filterCategories = action.payload.filterCategories;
      // state.filterParams.isTrending = action.payload.isTrending;
      // state.filterParams.rating = action.payload.rating;
      // state.filterParams.isHealthy = action.payload.isHealthy;
      // state.filterParams.isSupreme = action.payload.isSupreme;
      // state.filterParams.minPrice = action.payload.minPrice;
      // state.filterParams.maxPrice = action.payload.maxPrice;
      // state.filterParams.sort = action.payload.sort;
      state.filterParams = newState;
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
          state.filteredProducts = action.payload;
          state.nothingFound = false;
        }
        state.loading = false;
      })
      .addCase(fetchFilteredProducts.rejected, setError);
  },
});

export const { setFilteredProducts, setFilterParams, setNothingFound } = filterSlice.actions;

export default filterSlice.reducer;
