import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import testreducer from './slices/testSlice';
import modalslice from './slices/modalSlice';
import authorizationSlice from './slices/authorizationSlice';
import userSlice from './slices/userSlice';
import productsSlice from './slices/productsSlice';
import partnersSlice from './slices/partnersSlice';

const middleware = getDefaultMiddleware({
  serializableCheck: false,
});

const store = configureStore({
  reducer: {
    test: testreducer,
    modal: modalslice,
    authorization: authorizationSlice,
    user: userSlice,
    products: productsSlice,
    partners: partnersSlice,
  },
  middleware,
});

export default store;
