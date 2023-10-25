import { createSlice } from '@reduxjs/toolkit';
import { instance } from '../../API/instance';

const initialState = {
  favourites: [],
  cardStates: {},
  user: '',
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
    setUser(state, action) {
      state.user = action.payload;
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
});

export const {
  addFavourite,
  removeFavourite,
  setFavourite,
  resetCardStates,
} = favouriteSlice.actions;

export const getFavourites = () => async (dispatch) => {
  try {
    // dispatch(setIsLoading(true));
    const { data } = await instance.get('/wishlist');
    console.log(data);
    const { products } = data;
    dispatch(setFavourite(products));
    // dispatch(setIsLoading(false));
  } catch (error) {
    console.warn('Error loading favourites:', error);
    // dispatch(setIsLoading(false));
  }
};

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

export const updateFavourites = (favourites) => async (dispatch, getState) => {
  try {
    const state = getState();
    const updatedWishlist = {
      products: state.favourites.favourites,
    };
    console.log(favourites);
    const { authorization } = state;
    if (authorization && authorization.token) {
      const response = await instance.put('/wishlist', updatedWishlist);
      console.log(response);
      // const { favourite } = data;
      // setFavourite(data.favourite);// eslint-disable-line no-use-before-define
    }
  } catch (error) {
    console.log('%cError push review:', 'color: red; font-weight: bold;', error);
  }
};

export default favouriteSlice.reducer;
