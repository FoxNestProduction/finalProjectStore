import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../../API/instance';
import { setLoading, setError } from '../extraReducersHelpers';

export const fetchFavourites = createAsyncThunk(
  'favourites/fetchByIdStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get('/wishlist');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  favourites: [],
  cardStates: {},
  loading: false,
  error: null,
};

const favouriteSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    setFavourite(state, action) {
      state.favourites = action.payload;
      action.payload.forEach(({ _id }) => {
        state.cardStates[_id] = true;
      });
    },
    addFavourite(state, action) {
      const id = action.payload;
      state.favourites.push(action.payload.id);
      state.cardStates[id] = true;
    },
    removeFavourite(state, action) {
    // eslint-disable-next-line no-underscore-dangle
      const id = action.payload;
      state.favourites = state.favourites.filter((item) => item !== action.payload);
      state.cardStates[id] = false;
    },
    resetCardStates(state) {
      state.cardStates = {};
      state.favourites = [];
    },
  },
  extraReducers: {
    [fetchFavourites.pending]: setLoading,
    [fetchFavourites.fulfilled]: (state, action) => {
      state.loading = false;
      state.favourites = action.payload;
      state.user = action.payload;
      action.payload.forEach(({ _id }) => {
        state.cardStates[_id] = true;
      });
    },
    [fetchFavourites.rejected]: setError,
  },
});

export const {
  addFavourite,
  removeFavourite,
  setFavourite,
  resetCardStates,
} = favouriteSlice.actions;

export const addToFavourites = ({ id }) => async (dispatch) => {
  try {
    const { data } = await instance.put(`/wishlist/${id}`);
    const { products } = data;
    dispatch(setFavourite(products));
  } catch (error) {
    console.warn('Error loading favourites:', error);
  }
};

export const deleteFromFavourites = ({ id }) => async (dispatch) => {
  try {
    const { data } = await instance.delete(`/wishlist/${id}`);
    dispatch(setFavourite(data.products));
    dispatch(removeFavourite(id));
    console.log(data.products);
    console.log(id);
  } catch (error) {
    console.warn('Error loading favourites:', error);
  }
};

export default favouriteSlice.reducer;
