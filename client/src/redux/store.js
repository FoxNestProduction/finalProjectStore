import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import modalSlice from './slices/modalSlice';
import authorizationSlice from './slices/authorizationSlice';
import userSlice from './slices/userSlice';
import restaurantSlice from './slices/restaurantSlice';

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
});

const middleware = getDefaultMiddleware({
  serializableCheck: false,
});

const store = configureStore({
<<<<<<< HEAD
  reducer: {
    test: testreducer,
    modal: modalslice,
    authorization: authorizationSlice,
    user: userSlice,
    restaurant: restaurantSlice,
  },
=======
  reducer,
>>>>>>> dev
  middleware,
});

export default store;
