import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import axios from 'axios';

const initialState = {
  cartItems: [],
  setLoading: false,
  isCart: false,
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
      // або ж підписуємось на це значення за допомогою useSelector
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
    setCart(state, action) {
      state.cartItems = action.payload; // в розробці логіка злиття тієї інформації яка вже є
      //  в localStorage, та яка приходить з сервера
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    deleteFromCart(state, action) {
      // 1-ий варіант - коли нам в action.payload надходить повний об'єкт item
      // if (state.cartItems.length) {
      //   const index = state.cartItems.findIndex((item) => item.id === action.payload.id);

      //   if (index !== -1) {
      //     state.cartItems[index] = (
      //       state.cartItems[index] === 1
      //         ? state.cartItems.splice(index, 1)
      //         : state.cartItems[index].quantity -= 1
      //     );
      //   }
      // }
      // 2-ий варіант - коли нам в action.payload надходить id об'єкта товара
      // const products = useSelector((state) => state.products.products);
      // такого значення ще не існує
      // if (state.cartItems.length) {
      //   const cartItem = products.find(product => product.id === action.payload);
      // }
    },
  },
});

export const { addToCart, setCart, setLoading, deleteFromCart } = cartSlice.actions;

const getCartItemsFromServer = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const userId = useSelector((state) => state.user.user.id);
    const { data } = await axios.get('http://localhost:4000/cart'); // якщо data undefined, то нічого не передаємо в кошик
    // а isCart(true or false). Код далі не виконується і дані на сторінці відмальовуються
    // тільки зі стора
    const cartContainer = data.find((cartObj) => cartObj.customerId.id === userId);

    dispatch(setCart(cartContainer)); // якщо ми тут оновимо state то оновиться і localStorage
    //  тому тут потрібно написати логіку злиття даних з localStorage з даними з сервера.
    dispatch(setLoading(false));
  } catch (error) {
    console.warn(error);
    dispatch(setLoading(false));
  }
};

export default cartSlice.reducer;
