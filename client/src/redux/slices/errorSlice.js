import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authorization: '',
  registration: '',
};

/* eslint-disable no-param-reassign */

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setAuthorizationError: (state, action) => {
      state.authorization = action.payload;
    },
  },

});

export const {
  setAuthorizationError,
} = errorSlice.actions;

/* eslint-enable no-param-reassign */

export default errorSlice.reducer;
