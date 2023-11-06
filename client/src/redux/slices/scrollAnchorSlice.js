import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productsScrollAnchor: {},
};

const scrollAnchorSlice = createSlice({
  name: 'scrollAnchor',
  initialState,
  reducers: {
    setProductsScrollAnchor(state, action) {
      state.productsScrollAnchor = action.payload;
    },
  },
});

export const {
  setProductsScrollAnchor,
} = scrollAnchorSlice.actions;

export default scrollAnchorSlice.reducer;
