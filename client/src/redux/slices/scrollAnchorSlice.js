import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  scrollAnchor: {},
};

const scrollAnchorSlice = createSlice({
  name: 'scrollAnchor',
  initialState,
  reducers: {
    setScrollAnchor(state, action) {
      state.scrollAnchor = action.payload;
    },
  },
});

export const {
  setScrollAnchor,
} = scrollAnchorSlice.actions;

export default scrollAnchorSlice.reducer;
