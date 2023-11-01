import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filteredProducts: [],
  filterParams: {
    filterCategories: [],
    isTrending: false,
    rating: null, // mostPopular
    isHealthy: false,
    isSupreme: false,
    minPrice: null,
    maxPrice: null,
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
      state.filterParams.filterCategories = action.payload.filterCategories;
      state.filterParams.isTrending = action.payload.isTrending;
      state.filterParams.rating = action.payload.rating;
      state.filterParams.isHealthy = action.payload.isHealthy;
      state.filterParams.isSupreme = action.payload.isSupreme;
      state.filterParams.minPrice = action.payload.minPrice;
      state.filterParams.maxPrice = action.payload.maxPrice;
      state.filterParams.sort = action.payload.sort;
    },

  },
});

export const { setFilteredProducts, setFilterParams } = filterSlice.actions;

export default filterSlice.reducer;
