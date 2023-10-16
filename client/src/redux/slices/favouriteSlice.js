import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  favourites: [],
  cardStates: {},
};

const favouriteSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    setFavourite(state, action) {
      state.favourites = action.payload;
      action.payload.forEach((id) => {
        state.cardStates[id] = true;
      });
    },
    addFavourite(state, action) {
      const { id } = action.payload;
      state.favourites.push(action.payload.id);
      state.cardStates[id] = true;
    },
    removeFavourite(state, action) {
    // eslint-disable-next-line no-underscore-dangle
      const { id } = action.payload;
      const newStateFavourites = state.favourites.filter((item) => item !== action.payload.id);
      state.favourites = newStateFavourites;
      state.cardStates[id] = false;
    },
  },
});

export const {
  addFavourite,
  removeFavourite,
  setFavourite,
  isFavourite,
} = favouriteSlice.actions;

export const updateFavourites = (favourites) => async (dispatch, getState) => {
  try {
    const state = getState();
    const { authorization } = state;
    // console.log(state.favourites.favourites);
    if (authorization && authorization.token) {
      const { data } = await axios.put('http://localhost:4000/api/customers', { favourite: state.favourites.favourites }, {
        headers: {
          Authorization: state.authorization.token,
        },
      });
      const { favourite } = data;
      setFavourite(data.favourite);// eslint-disable-line no-use-before-define
      // console.log(favourite);
    } else {
      console.log('The user is not authorized');
    }
  } catch (error) {
    console.log('%cError push review:', 'color: red; font-weight: bold;', error);
  }
};

export default favouriteSlice.reducer;
