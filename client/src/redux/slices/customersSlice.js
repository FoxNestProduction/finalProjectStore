import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  customers: [],
};

/* eslint-disable no-param-reassign */

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setCustomers(state, action) { // eslint-disable-line no-shadow
      state.customers = action.payload;
    },
  },
});

export const getCustomers = () => async (dispatch) => {
  try {
    const { data } = await axios.get('http://localhost:4000/api/customers');
    console.log(data);
    dispatch(setCustomers(data));// eslint-disable-line no-use-before-define
  } catch (error) {
    console.log('%cError loading customers:', 'color: red; font-weight: bold;', error);
  }
};

export const { setCustomers } = customersSlice.actions;

/* eslint-enable no-param-reassign */

export default customersSlice.reducer;
