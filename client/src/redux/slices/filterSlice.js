import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../../API/instance';
import { resetSearch } from './searchSlice';
import { setError, setLoading } from '../extraReducersHelpers';

export const fetchFilteredProducts = createAsyncThunk(
  'filter/fetchFilteredProducts',
  async (queryString, { rejectWithValue, dispatch }) => {
    try {
      const response = await instance.get(`/products/filter${queryString}`);
      if (response.data.products.length > 0) {
        dispatch(resetSearch());
      }
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
    setFilterParams(state, action) {
      state.filterParams = { ...state.filterParams, ...action.payload };
    },
    deleteFilteredData(state) {
      state.filteredProducts = [];
      state.productsQuantity = null;
      state.nothingFound = false;
    },
    resetFilterParams(state, action) {
      state.filterParams = {
        filterCategories: [],
        isTrending: false,
        rating: null,
        isHealthy: false,
        isSupreme: false,
        minPrice: 0,
        maxPrice: 30,
        sort: action.payload === 'withoutSort' ? state.filterParams.sort : '',
        startPage: 1,
        perPage: state.filterParams.perPage,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredProducts.pending, setLoading)
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        if (action.payload.products.length === 0) {
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

export const {
  setFilterParams,
  deleteFilteredData,
  resetFilterParams,
} = filterSlice.actions;

export default filterSlice.reducer;
