import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../../API/instance';
import { setError, setLoading } from '../extraReducersHelpers';

export const putNewOrder = createAsyncThunk(
  'order/putNewOrder',
  async (newOrder, { rejectWithValue }) => {
    try {
      const response = await instance.post('/orders', newOrder);
      return response;
    } catch (err) {
      return rejectWithValue("Oops! We couldn't process your order. Please check your details and try again. If the issue persists, contact support.");
    }
  },
);

const initialState = {
  order: {},
  pendingOrderInfo: {},
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setPendingOrderInfo(state, { payload }) {
      state.pendingOrderInfo = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(putNewOrder.pending, setLoading)
      .addCase(putNewOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.order = payload.data.order;
      })
      .addCase(putNewOrder.rejected, setError);
  },
});

export const { setPendingOrderInfo } = orderSlice.actions;

export default orderSlice.reducer;
