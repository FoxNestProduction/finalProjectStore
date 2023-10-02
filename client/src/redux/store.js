import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import testreducer from './slices/testSlice';
import modalreducer from './slices/modalSlice';
import productsreducer from './slices/productsSlice';

const middleware = getDefaultMiddleware({
  serializableCheck: false,
});

const store = configureStore({
  reducer: {
    test: testreducer,
    modal: modalreducer,
    products: productsreducer,
  },
  middleware,
});

export default store;
