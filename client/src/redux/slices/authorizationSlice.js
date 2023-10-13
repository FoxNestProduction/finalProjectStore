import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isUserAuthorized: false,
  token: null,
};

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

export default authorizationSlice.reducer;
