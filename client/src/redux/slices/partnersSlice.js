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

export const getAllPartnersNames = () => async (dispatch) => {
  try {
    const { data } = await instance.get('/partners/names');
    dispatch(setAllPartnersNames(data)); // eslint-disable-line
  } catch (error) {
    console.log('%cError loading allPartnersNames:', 'color: red; font-weight: bold;', error);
  }
};

const initialState = {
  partners: [],
  topPartners: [],
  allPartnersNames: [],
  loading: false,
  error: null,
};

const partnersSlice = createSlice({
  name: 'partners',
  initialState,
  reducers: {
    setPartners(state, action) {
      state.partners = action.payload;
    },
    setAllPartnersNames(state, action) {
      state.allPartnersNames = action.payload;
    },
  },
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

export const { setPartners, setAllPartnersNames } = partnersSlice.actions;

// todo: видалити, коли всі дані будуть завантажуватись через asyncThunk/локально в компонентах
// export const getPartners = () => async (dispatch) => {
//   try {
//     const { data } = await instance.get('/partners');
//     dispatch(setPartners(data));
//   } catch (err) {
//     console.log('%cError loading products:', 'color: red; font-weight: bold;', err);
//   }
// };

export default partnersSlice.reducer;
