import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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

export const fetchRestaurant = () => async (dispatch) => {
  try {
    const { data } = await axios.get('http://localhost:4000/api/partners');
    dispatch(setRestaurant(data));
  } catch (err) {
    console.log(err);
  }
};

export default restaurantSlice.reducer;
