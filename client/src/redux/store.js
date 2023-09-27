import { configureStore } from '@reduxjs/toolkit';
import testreducer from './slices/testSlice';
import modalreduser from './slices/modalSlice';

const store = configureStore({
  reducer: {
    test: testreducer,
    modal: modalreduser,
  },
});

export default store;
