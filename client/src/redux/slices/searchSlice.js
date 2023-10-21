import { createSlice } from '@reduxjs/toolkit';

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
});

export const { setSearch, setKey, setInputSearchValue } = searchSlice.actions;

export default searchSlice.reducer;
