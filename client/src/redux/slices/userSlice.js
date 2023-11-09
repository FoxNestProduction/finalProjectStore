import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  newUser: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setNewUser(state, action) {
      state.newUser = action.payload;
    },
  },
});

export const {
  setUser,
  setNewUser,
} = userSlice.actions;

export default userSlice.reducer;
