import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../../API/instance';
import { setError, setLoading } from '../extraReducersHelpers';

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

const initialState = {
  topPartners: [],
  loading: false,
  error: null,
};

const partnersSlice = createSlice({
  name: 'partners',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopPartners.pending, setLoading)
      .addCase(fetchTopPartners.fulfilled, (state, action) => {
        state.loading = false;
        state.topPartners = action.payload;
      })
      .addCase(fetchTopPartners.rejected, setError);
  },
});

export default partnersSlice.reducer;
