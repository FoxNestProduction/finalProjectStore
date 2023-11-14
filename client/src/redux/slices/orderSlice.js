import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../../API/instance';
import { setError, setLoading } from '../extraReducersHelpers';

export const putNewOrder = createAsyncThunk(
  'order/putNewOrder',
  async (newOrder, { rejectWithValue }) => {
    try {
      const response = await instance.post('/orders', newOrder);
      console.log(response.data.order);
      return response.data.order;
    } catch (err) {
      console.log(err);
      return rejectWithValue("Oops! We couldn't process your order. Please check your details and try again. If the issue persists, contact support.");
    }
  },
);

const initialState = {
  order: {},
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(putNewOrder.pending, setLoading)
      .addCase(putNewOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(putNewOrder.rejected, setError);
  },
});

export default orderSlice.reducer;
