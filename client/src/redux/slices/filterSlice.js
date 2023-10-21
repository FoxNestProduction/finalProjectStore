import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action) { // eslint-disable-line no-shadow
      state.filter = action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;

export default filterSlice.reducer;
