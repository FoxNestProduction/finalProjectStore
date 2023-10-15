import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
// todo: правила для redux-persist
// eslint-disable-next-line import/no-extraneous-dependencies
import storage from 'redux-persist/lib/storage';
// eslint-disable-next-line import/no-extraneous-dependencies
import { persistReducer } from 'redux-persist';
import modalSlice from './slices/modalSlice';
import productsSlice from './slices/productsSlice';
import authorizationSlice from './slices/authorizationSlice';
import userSlice from './slices/userSlice';
import partnersSlice from './slices/partnersSlice';
import searchSlice from './slices/searchSlice';
import errorSlice from './slices/errorSlice';
import reviewsSlice from './slices/reviewsSlice';
import favouriteSlice from './slices/favouriteSlice';

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

const searchPersistConfig = {
  key: 'search',
  version: 1,
  storage,
};
const favouritePersistConfig = {
  key: 'favorites',
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
  error: errorSlice,
  modal: modalSlice,
  partners: partnersSlice,
  authorization: persistReducer(authPersistConfig, authorizationSlice),
  user: persistReducer(userPersistConfig, userSlice),
  products: productsSlice,
  search: persistReducer(searchPersistConfig, searchSlice),
  reviews: reviewsSlice,
  favourites: persistReducer(favouritePersistConfig, favouriteSlice),
});

const middleware = getDefaultMiddleware({
  serializableCheck: false,
});

const store = configureStore({
  reducer,
  middleware,
});

export default store;
