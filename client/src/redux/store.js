import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import testreducer from './slices/testSlice';
import modalslice from './slices/modalSlice';
import authorizationSlice from './slices/authorizationSlice';

const middleware = getDefaultMiddleware({
  serializableCheck: false,
});

const store = configureStore({
  reducer: {
    test: testreducer,
    modal: modalslice,
    authorization: authorizationSlice,
  },
  middleware,
});

export default store;
