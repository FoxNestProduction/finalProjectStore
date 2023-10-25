import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../../API/instance';

const initialState = {
  partners: [],
  topPartners: [],
  loading: 'idle', // 'idle' | 'pending' | 'succeeded' | 'failed'
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

const setError = (state, action) => {
  state.loading = 'failed';
  state.error = action.payload;
};

const partnersSlice = createSlice({
  name: 'partners',
  initialState,
  reducers: {
    setPartners(state, action) {
      state.partners = action.payload;
    },
  },
  extraReducers: {
    [fetchTopPartners.pending]: (state) => {
      state.loading = 'pending';
      state.error = null;
    },
    [fetchTopPartners.fulfilled]: (state, action) => {
      state.loading = 'succeeded';
      state.topPartners = action.payload;
    },
    [fetchTopPartners.rejected]: setError,
  },
});

export const { setPartners } = partnersSlice.actions;

export const getPartners = () => async (dispatch) => {
  try {
    const { data } = await instance.get('/partners');
    dispatch(setPartners(data));
  } catch (err) {
    console.log('%cError loading products:', 'color: red; font-weight: bold;', err);
  }
};

export default partnersSlice.reducer;
