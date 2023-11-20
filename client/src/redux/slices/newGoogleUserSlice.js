import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  newGoogleUser: {
    email: '',
    firstName: '',
    lastName: '',
  },
};

const newGoogleUserSlice = createSlice({
  name: 'newGoogleUser',
  initialState,
  reducers: {
    setNewGoogleUser(state, action) {
      state.newGoogleUser = action.payload;
    },
  },
});

export const {
  setNewGoogleUser,
} = newGoogleUserSlice.actions;

export default newGoogleUserSlice.reducer;
