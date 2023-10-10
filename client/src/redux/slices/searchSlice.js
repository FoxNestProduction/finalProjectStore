import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: [],
  key: '',
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
  },
});

export const { setSearch, setKey } = searchSlice.actions;

export default searchSlice.reducer;
