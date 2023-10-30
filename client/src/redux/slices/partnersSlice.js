import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../../API/instance';
import { setLoading, setError } from '../extraReducersHelpers';

const initialState = {
  topPartners: [],
  loading: false,
  error: null,
};

export const fetchTopPartners = createAsyncThunk(
  'partners/fetchTopPartners',
  async (count, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/partners/filter?perPage=${count}&sort=-rating`);
      return response.data.partners;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const partnersSlice = createSlice({
  name: 'partners',
  initialState,
  extraReducers: {
    [fetchTopPartners.pending]: setLoading,
    [fetchTopPartners.fulfilled]: (state, action) => {
      state.loading = false;
      state.topPartners = action.payload;
    },
    [fetchTopPartners.rejected]: setError,
  },
});

export const { setPartners } = partnersSlice.actions;

export default partnersSlice.reducer;
