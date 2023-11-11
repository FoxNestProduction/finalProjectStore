import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  isRegistrationSuccessful: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setIsRegistrationSuccessful(state, action) {
      state.isRegistrationSuccessful = action.payload;
    },
  },
});

export const {
  setUser,
  setIsRegistrationSuccessful,
} = userSlice.actions;

export default userSlice.reducer;
