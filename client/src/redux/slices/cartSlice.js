import { createSlice } from '@reduxjs/toolkit';
import CART from '../../constants/index';

const initialState = {
  cartItems: [],
};

/* eslint-disable no-param-reassign */

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      // 1-ий варіант - коли нам в action.payload надходить повний об'єкт item
      if (state.cartItems.length === 0) {
        state.cartItems.push(action.payload);
        // якщо користувач не авторизований, то відповідно
        // ми записуємо це значення до localStorage
      } else {
        const index = state.cartItems.findIndex((item) => item.id === action.payload.id);
        if (index === -1) {
          state.cartItems.push(action.payload);
          // якщо користувач не авторизований, то відповідно
          // ми записуємо це значення до localStorage
        } else {
          state.cartItems[index].quantity += 1;
          // якщо користувач не авторизований, то відповідно
          // ми записуємо це значення до localStorage
        }
      }
      // 2-ий варіант, коли нам приходить суто id товара
      // import { products } from './productsSlice'; - імпортуємо
      // дуструктуроване значення всіх product зі slice зі всіма товарами
      //
      // const cartItem = products.find(product => product.id === action.payload);
      // if (cartItem !== null && cartItem !== undefined) {
      //   if (state.cartItems.length === 0) {
      //     state.cartItems.push(cartItem);
      //   } else {
      //     const index = state.cartItems.findIndex((item) => item.id === cartItem.id);
      //     if (index === -1) {
      //       state.cartItems.push(action.payload);
      //     } else {
      //       state.cartItems[index].quantity += 1;
      //     }
      //   }
      // }
    },
  },
  setCart(state, action) {

  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
