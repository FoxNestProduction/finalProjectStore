import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../../API/instance';
import { setError, setLoading } from '../extraReducersHelpers';

export const fetchSearchedProductsOrPartners = createAsyncThunk(
  'search/fetchSearchedProductsOrPartners',
  async ({ url, body }, { rejectWithValue }) => {
    try {
      const response = await instance.post(url, body);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const initialState = {
  search: [],
  loading: false,
  error: null,
  key: 'food',
  inputSearchValue: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setKey(state, action) {
      state.key = action.payload;
    },
    setInputSearchValue(state, action) {
      state.inputSearchValue = action.payload;
    },
    resetSearch(state) {
      state.search = [];
      state.inputSearchValue = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchedProductsOrPartners.pending, setLoading)
      .addCase(fetchSearchedProductsOrPartners.fulfilled, (state, action) => {
        state.search = action.payload;
      })
      .addCase(fetchSearchedProductsOrPartners.rejected, setError);
  },
});

export const { setSearch, setKey, setInputSearchValue, resetSearch } = searchSlice.actions;

export default searchSlice.reducer;
