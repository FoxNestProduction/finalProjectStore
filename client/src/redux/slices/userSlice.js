import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../../API/instance';

export const updateCustomer = createAsyncThunk(
  'user/updateCustomer',
  async (customerUpdates) => {
    const response = await instance.put('/customers', customerUpdates);
    return response.data;
  },
);

const initialState = {
  user: {},
  isRegistrationSuccessful: false,
  loading: {
    updatedCustomer: false,
    loginCustomer: false,
  },
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
  extraReducers: (builder) => {
    builder
      .addCase(updateCustomer.pending, (state) => {
        state.loading.updatedCustomer = true;
      })
      .addCase(updateCustomer.fulfilled, (state, { payload }) => {
        state.loading.updatedCustomer = false;
        state.user = payload;
      })
      .addCase(updateCustomer.rejected, (state) => {
        state.loading.updatedCustomer = false;
      });
  },
});

export const {
  setUser,
  setIsRegistrationSuccessful,
} = userSlice.actions;

export default userSlice.reducer;
