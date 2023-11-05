import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../../API/instance';
import { setLoading, setError } from '../extraReducersHelpers';

export const fetchFavourites = createAsyncThunk(
  'favourites/fetchFavourites',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get('/wishlist');
      return data.products;
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
      action.payload.forEach(({ id }) => {
        state.cardStates[id] = true;
      });
    },
    addFavourite(state, action) {
      const newProduct = action.payload[action.payload.length - 1];
      state.favourites.push(newProduct);
    },
    setIsFavourite(state, action) {
      state.cardStates[action.payload] = true;
      state.loading = true;
    },
    setIsLoading(state) {
      state.loading = false;
    },
    removeFavourite(state, action) {
    // eslint-disable-next-line no-underscore-dangle
      const id = action.payload;
      state.favourites = state.favourites.filter((item) => item._id !== id);
      state.cardStates[id] = false;
      delete state.cardStates[id];
      state.loading = true;
    },
    resetCardStates(state) {
      state.cardStates = {};
      state.favourites = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavourites.pending, setLoading)
      .addCase(fetchFavourites.rejected, setError)
      .addCase(fetchFavourites.fulfilled, (state, action) => {
        state.loading = false;
        state.favourites = action.payload;
        action.payload.forEach(({ _id }) => {
          state.cardStates[_id] = true;
        });
      });
  },
});

export const {
  addFavourite,
  setIsFavourite,
  removeFavourite,
  setFavourite,
  setIsLoading,
  resetCardStates,
} = favouriteSlice.actions;

export const addToFavourites = ({ id }) => async (dispatch) => {
  try {
    const { data } = await instance.put(`/wishlist/${id}`);
    if (data) {
      dispatch(setIsLoading());
    }
    const { products } = data;
    dispatch(addFavourite(products));
  } catch (error) {
    console.warn('Error loading favourites:', error);
  }
};

export const deleteFromFavourites = ({ id }) => async (dispatch) => {
  dispatch(removeFavourite(id));
  try {
    const response = await instance.delete(`/wishlist/${id}`);
    if (response) {
      dispatch(setIsLoading());
    }
  } catch (error) {
    console.warn('Error loading favourites:', error);
  }
};

export default favouriteSlice.reducer;
