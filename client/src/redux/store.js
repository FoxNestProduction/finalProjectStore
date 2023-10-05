import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import modalSlice from './slices/modalSlice';
import productsSlice from './slices/productsSlice';
import authorizationSlice from './slices/authorizationSlice';
import userSlice from './slices/userSlice';
import reviewsSlice from './slices/reviewsSlice';

const authPersistConfig = {
  key: 'authorization',
  version: 1,
  storage,
};

const userPersistConfig = {
  key: 'user',
  version: 1,
  storage,
};
/*
    todo: - ЗВЕРНІТЬ УВАГУ!
      якщо вам потрібно щоб ваш стейт не зникав після перезавантаження
      то юзайте підхід як authorization і user,
      якщо ж ні то варіант написання як для modal всередині reducer
      Якщо що пишіть @Ihor_Kacher
*/
const reducer = combineReducers({
  modal: modalSlice,
  authorization: persistReducer(authPersistConfig, authorizationSlice),
  user: persistReducer(userPersistConfig, userSlice),
  products: productsSlice,
  reviews: persistReducer(userPersistConfig, reviewsSlice),
});

const middleware = getDefaultMiddleware({
  serializableCheck: false,
});

const store = configureStore({
  reducer,
  middleware,
});

export default store;
