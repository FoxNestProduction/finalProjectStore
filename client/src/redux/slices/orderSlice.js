import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderInfo: {},
  confirmedOrder: {},
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
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
} = orderSlice.actions;

export default orderSlice.reducer;
