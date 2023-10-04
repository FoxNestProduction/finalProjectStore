import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: '',
};

/* eslint-disable no-param-reassign */

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },

});

export const {
  setError,
} = errorSlice.actions;

/* eslint-enable no-param-reassign */

export default errorSlice.reducer;
