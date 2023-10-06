import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  partners: [],
};

const partnersSlice = createSlice({
  name: 'partners',
  initialState,
  reducers: {
    setPartners(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.partners = action.payload;
    },
  },
});

export const {
  setPartners,
} = partnersSlice.actions;

export const getPartners = () => async (dispatch) => {
  try {
    const { data } = await axios.get('http://localhost:4000/api/partners');
    dispatch(setPartners(data));
  } catch (err) {
    console.log('%cError loading products:', 'color: red; font-weight: bold;', err);
  }
};

export default partnersSlice.reducer;
