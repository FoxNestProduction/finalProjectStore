import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authorization: '',
  registration: '',
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setAuthorizationError: (state, action) => {
      state.authorization = action.payload;
    },
    setRegistrationError: (state, action) => {
      state.registration = action.payload;
    },
  },
});

export const {
  setAuthorizationError,
  setRegistrationError,
} = errorSlice.actions;

export default errorSlice.reducer;
