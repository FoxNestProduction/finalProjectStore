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
import cartSlice from './slices/cartSlice';
import orderSlice from './slices/orderSlice';
import filterSlice from './slices/filterSlice';
import scrollAnchorSlice from './slices/scrollAnchorSlice';
import newGoogleUserSlice from './slices/newGoogleUserSlice';

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

const favouritePersistConfig = {
  key: 'favorites',
  version: 1,
  storage,
};

const cartPersistConfig = {
  key: 'cart',
  version: 1,
  storage,
};

const reducer = combineReducers({
  error: errorSlice,
  modal: modalSlice,
  partners: partnersSlice,
  authorization: persistReducer(authPersistConfig, authorizationSlice),
  user: persistReducer(userPersistConfig, userSlice),
  newGoogleUser: newGoogleUserSlice,
  products: productsSlice,
  search: searchSlice,
  order: orderSlice,
  reviews: reviewsSlice,
  favourites: persistReducer(favouritePersistConfig, favouriteSlice),
  filter: filterSlice,
  cart: persistReducer(cartPersistConfig, cartSlice),
  scrollAnchor: scrollAnchorSlice,
});

const middleware = getDefaultMiddleware({
  serializableCheck: false,
});

const store = configureStore({
  reducer,
  middleware,
});

export default store;
