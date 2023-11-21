import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../../API/instance';
import { setAuthorizationError } from './errorSlice';

export const updateCustomer = createAsyncThunk(
  'user/updateCustomer',
  async (customerUpdates, { rejectWithValue }) => {
    try {
      const response = await instance.put('/customers', customerUpdates);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const loginCustomer = createAsyncThunk(
  'user/loginCustomer',
  // eslint-disable-next-line consistent-return
  async (customerData, { dispatch }) => {
    try {
      dispatch(setAuthorizationError(''));
      const response = await instance.post('/customers/login', customerData);
      return response.data;
    } catch (err) {
      dispatch(setAuthorizationError(err.response.data));
    }
  },
);

const initialState = {
  user: {},
  isRegistrationSuccessful: false,
  loading: {
    updatedCustomer: false,
    loginCustomer: false,
    registerCustomer: false,
  },
  error: null,
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
        state.error = null;
      })
      .addCase(updateCustomer.fulfilled, (state, { payload }) => {
        state.loading.updatedCustomer = false;
        state.user = payload;
      })
      .addCase(updateCustomer.rejected, (state, { payload }) => {
        state.loading.updatedCustomer = false;
        state.error = payload;
      })

      .addCase(loginCustomer.pending, (state) => {
        state.loading.loginCustomer = true;
      })
      .addCase(loginCustomer.fulfilled, (state, { payload }) => {
        state.loading.loginCustomer = false;
        state.user = payload.user;
      })
      .addCase(loginCustomer.rejected, (state, { payload }) => {
        state.loading.loginCustomer = false;
      });
  },
});

export const {
  setUser,
  setIsRegistrationSuccessful,
} = userSlice.actions;

export default userSlice.reducer;
