import { createSlice } from '@reduxjs/toolkit';

const initialState = {

};

const googleAuthSlice = createSlice({
  name: 'googleAuth',
  initialState,
  reducers: {
    redirect() {
      // const url = genera
    },
    setOrderInfo(state, action) {
      state.orderInfo = action.payload;
    },
    setConfirmedOrder(state, action) {
      state.confirmedOrder = action.payload;
    },
  },
});

export const {
  setOrderInfo,
  setConfirmedOrder,
} = googleAuthSlice.actions;
