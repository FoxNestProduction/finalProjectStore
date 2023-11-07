import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productsScrollAnchor: null,
  isApplyClicked: false,
};

const scrollAnchorSlice = createSlice({
  name: 'scrollAnchor',
  initialState,
  reducers: {
    setProductsScrollAnchor(state, action) {
      state.productsScrollAnchor = action.payload;
    },
    setIsApplyClicked(state, action) {
      state.isApplyClicked = action.payload;
    },
  },
});

export const {
  setProductsScrollAnchor,
  setIsApplyClicked,
} = scrollAnchorSlice.actions;

export default scrollAnchorSlice.reducer;
