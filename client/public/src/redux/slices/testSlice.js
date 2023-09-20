import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  testArr: [],
};

const testslice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    addTest(state, action) {
      console.log(state);
    },
  },
});

export const { addTest } = testslice.actions;
export default testslice.reducer;
