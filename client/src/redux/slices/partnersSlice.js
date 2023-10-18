import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { instance } from '../../API/instance';

const initialState = {
  partners: [],
};

const partnersSlice = createSlice({
  name: 'partners',
  initialState,
  reducers: {
    setPartners(state, action) {
      state.partners = action.payload;
    },
  },
});

export const { setPartners } = partnersSlice.actions;

export const getPartners = () => async (dispatch) => {
  try {
    const { data } = await instance.get('/partners');
    dispatch(setPartners(data));
  } catch (err) {
    console.log('%cError loading products:', 'color: red; font-weight: bold;', err);
  }
};

export default partnersSlice.reducer;
