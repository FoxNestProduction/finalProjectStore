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
  },

});

export const {
  setAuthorizationError,
} = errorSlice.actions;

export default errorSlice.reducer;
