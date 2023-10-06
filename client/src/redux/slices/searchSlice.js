import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: [],
  key: '',
};

/* eslint-disable no-param-reassign */

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch(state, action) { // eslint-disable-line no-shadow
      state.search = action.payload;
    },
    setKey(state, action) { // eslint-disable-line no-shadow
      state.key = action.payload;
      console.log(action.payload);
    },
  },
});

export const { setSearch, setKey } = searchSlice.actions;

/* eslint-enable no-param-reassign */

export default searchSlice.reducer;
