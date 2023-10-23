import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: true,
};

const skeletonSlice = createSlice({
  name: 'skeleton',
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsLoading } = skeletonSlice.actions;

export default skeletonSlice.reducer;
