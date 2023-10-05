import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isUserAuthorized: false,
  token: null,
};

/* eslint-disable no-param-reassign */

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setAuthorization(state, action) {
      state.isUserAuthorized = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },

});

export const {
  setAuthorization,
  setToken,
} = authorizationSlice.actions;

/* eslint-enable no-param-reassign */

export default authorizationSlice.reducer;
