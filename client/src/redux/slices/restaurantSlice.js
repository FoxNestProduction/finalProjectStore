import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  restaurant: [],
};

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setRestaurant(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.restaurant = action.payload;
    },
  },
});

export const {
  setRestaurant,
} = restaurantSlice.actions;

/* eslint-enable no-param-reassign */

export const fetchRestaurant = () => async (dispatch) => {
  const res = await fetch('http://localhost:4000/api/products');
  const data = await res.json();
  dispatch(setRestaurant(data));
};

export default restaurantSlice.reducer;
