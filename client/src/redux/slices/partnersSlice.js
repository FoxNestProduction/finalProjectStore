import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  partners: [],
};

/* eslint-disable no-param-reassign */

const partnersSlice = createSlice({
  name: 'partners',
  initialState,
  reducers: {
    setPartners(state, action) { // eslint-disable-line no-shadow
      state.partners = action.payload;
    },
  },
});

export const getPartners = () => async (dispatch) => {
  try {
    const { data } = await axios.get('http://localhost:4000/api/partners');
    // console.log(data);
    dispatch(setPartners(data));// eslint-disable-line no-use-before-define
  } catch (error) {
    console.log(error);
  }
};

export const { setPartners } = partnersSlice.actions;

/* eslint-enable no-param-reassign */

export default partnersSlice.reducer;
