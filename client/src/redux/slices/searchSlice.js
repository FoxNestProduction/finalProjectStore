import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../../API/instance';

export const fetchSearchedProductsOrPartners = createAsyncThunk(
  'search/fetchSearchedProductsOrPartners',
  async ({ url, body }) => {
    const response = await instance.post(url, body);
    return response.data;
  },
);

const initialState = {
  search: [],
  key: '',
  inputSearchValue: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch(state, action) { // eslint-disable-line no-shadow
      state.search = action.payload;
    },
    setKey(state, action) { // eslint-disable-line no-shadow
      state.key = action.payload;
    },
    setInputSearchValue(state, action) { // eslint-disable-line no-shadow
      state.inputSearchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchedProductsOrPartners.fulfilled, (state, action) => {
        state.search = action.payload;
      });
  },
});

export const { setSearch, setKey, setInputSearchValue } = searchSlice.actions;

export default searchSlice.reducer;
