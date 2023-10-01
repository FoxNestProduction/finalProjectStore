import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isUserAuthorized: false,
};

/* eslint-disable no-param-reassign */

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setAuthorization(state, action) {
      state.isUserAuthorized = action.payload;
    },
  },
});

export const {
  setAuthorization,
} = authorizationSlice.actions;

/* eslint-enable no-param-reassign */

export default authorizationSlice.reducer;
