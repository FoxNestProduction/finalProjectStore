import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../../API/instance';
import { setError, setLoading } from '../extraReducersHelpers';

export const fetchAllPartners = createAsyncThunk(
  'partners/fetchAllPartners',
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get('/partners');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

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

export const fetchAllPartnersNames = createAsyncThunk(
  'partners/fetchAllPartnersNames',
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get('/partners/names');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

// ----- requests for Admin -----
export const fetchGetPartner = createAsyncThunk(
  'partners/fetchGetPartner',
  async (customId, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/partners/${customId}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const fetchUpdatePartner = createAsyncThunk(
  'partners/fetchUpdatePartner',
  async ({ customId, body }, { rejectWithValue }) => {
    try {
      const { data } = await instance.put(`/partners/${customId}`, body);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const initialState = {
  topPartners: [],
  allPartnersNames: [],
  currentEditingPartner: null,
  loading: false,
  error: null,
  allPartners: [],
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
      .addCase(fetchTopPartners.rejected, setError)
      .addCase(fetchAllPartnersNames.fulfilled, (state, action) => {
        state.allPartnersNames = action.payload;
      })

      // ---- Admin ---
      .addCase(fetchGetPartner.pending, setLoading)
      .addCase(fetchGetPartner.fulfilled, (state, action) => {
        state.currentEditingPartner = action.payload;
        state.loading = false;
      })

      .addCase(fetchUpdatePartner.pending, setLoading)
      .addCase(fetchUpdatePartner.fulfilled, (state, action) => {
        state.currentEditingPartner = { ...state.currentEditingPartner, ...action.payload };
        state.loading = false;
      })
      .addCase(fetchAllPartners.pending, setLoading)
      .addCase(fetchAllPartners.fulfilled, (state, action) => {
        state.allPartners = action.payload;
      })
      .addCase(fetchAllPartners.rejected, setError);
  },
});

export default partnersSlice.reducer;
