import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isUserAuthorized: false,
  token: null,
  isSendMail: false,
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
    setIsSendMail(state, action) {
      state.isSendMail = action.payload;
    },
  },
});

export const {
  setAuthorization,
  setToken,
  setIsSendMail,
} = authorizationSlice.actions;

export default authorizationSlice.reducer;
