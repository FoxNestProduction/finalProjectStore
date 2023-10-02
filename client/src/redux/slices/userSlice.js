import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
};

/* eslint-disable no-param-reassign */

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const {
  setUser,
} = userSlice.actions;

/* eslint-enable no-param-reassign */

export default userSlice.reducer;
