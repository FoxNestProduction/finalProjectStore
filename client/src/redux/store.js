import { configureStore } from '@reduxjs/toolkit';
import testreducer from './slices/testSlice';

const store = configureStore({
  reducer: {
    test: testreducer,
  },
});

export default store;
