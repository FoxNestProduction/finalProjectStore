import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { allProducts } from './productsSlice';

const initialState = {
  cartItems: [],
  isLoading: false,
  isCart: false,
};

/* eslint-disable no-param-reassign */

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      // 1-ий варіант - коли нам в action.payload надходить повний об'єкт item
      if (state.cartItems.length === 0 && action.payload !== null) {
        state.cartItems.push(action.payload);
      } else {
        const index = state.cartItems.findIndex((item) => item.id === action.payload.id);
        if (index === -1) {
          state.cartItems.push(action.payload);
        } else {
          state.cartItems[index].quantity += 1;
        }
      }
      /** 2-ий варіант, коли нам приходить суто id товара потрібно звернутись
       * до однієї з двох написаних нижче функцій:
       * - deleteOrAddCartByItemId , або
       * - deleteOrAddFromCartByItemIdWithValueFromState
       * Потрібно буде протестувати, який варіант зручніше, той і використовувати
       */
    },
    setCart(state, action) {
      if (state.cartItems.length === 0) {
        state.cartItems = action.payload;
      } else {
        const uniqueFilteredProducts = action.payload.products.filter((product) => {
          const matchedProduct = state.cartItems
            .find((cartItem) => cartItem.item.id !== product.id);
          const mark = matchedProduct !== undefined;
          return mark;
        });
        const notUniqueFilteredProducts = action.payload.products.filter((product) => {
          const matchedProduct = state.cartItems
            .find((cartItem) => cartItem.item.id === product.id);
          const mark = matchedProduct !== undefined;
          return mark;
        }).map((product) => {
          const matchedProduct = state.cartItems
            .find((cartItem) => cartItem.item.id === product.id);
          product.quantity += matchedProduct.quantity;
          return product;
        });
        state.cartItems = { ...uniqueFilteredProducts, ...notUniqueFilteredProducts };
      }
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setIsCart(state, action) {
      state.isCart = action.payload;
    },
    deleteFromCart(state, action) {
      // 1 - ий варіант - коли нам в action.payload надходить повний об'єкт item
      if (state.cartItems.length) {
        const index = state.cartItems.findIndex((item) => item.id === action.payload.id);

        if (index !== -1) {
          state.cartItems[index] = (
            state.cartItems[index] === 1
              ? state.cartItems.splice(index, 1)
              : state.cartItems[index].quantity -= 1
          );
        }
      }
      /** 2-ий варіант, коли нам приходить суто id товара потрібно звернутись
         * до однієї з двох написаних нижче функцій:
         * - deleteOrAddCartByItemId , або
         * - deleteOrAddFromCartByItemIdWithValueFromState
         * Потрібно буде протестувати, який варіант зручніше, той і використовувати
         */
    },
  },
});

export const { addToCart, setCart, setIsLoading, deleteFromCart, setIsCart } = cartSlice.actions;

export const getCartItemsFromServer = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const userId = useSelector((state) => state.user.user.id);
    const { data } = await axios.get('http://localhost:4000/cart');

    if (data !== null && data !== undefined) {
      const cartContainer = data.find((cartObj) => cartObj.customerId.id === userId);

      if (cartContainer !== null && data !== undefined) {
        dispatch(setIsCart(true));
        dispatch(setCart(cartContainer));
      } else {
        dispatch(setIsCart(false));
      }
    } else {
      dispatch(setIsCart(false));
    }
    // якщо data undefined, то нічого не передаємо в кошик
    // а isCart(true or false). Код далі не виконується і дані на сторінці відмальовуються
    // тільки зі стора

    // dispatch(setCart(cartContainer)); // якщо ми тут оновимо state то оновиться і localStorage
    //  тому тут потрібно написати логіку злиття даних з localStorage з даними з сервера.
    dispatch(setIsLoading(false));
  } catch (error) {
    console.warn('Error loading cart:', error);
    dispatch(setIsLoading(false));
    dispatch(setIsCart(false));
  }
};

/** 2 варіанти функції якщо ми додаємо або видаляємо товар в state cart через прокидування id:
 * TODO: варіант A:
 * ми робимо підписку на необхідний нам state всіх продуктів в самій функції.
 * Знаходимо по id необхідний нам об'єкт, та прокидуємо його в один з reducer-ов
 * за допомогою одного з ключів DELETE або ADD. Необхідний нам об'єкт падає
 * в визначений reducer та додається до кошику, або ж видаляється з нього.
 * Ця функція передається через dispatch. В неї прокидується id та key.
 * dispatch(deleteOrAddCartByItemId(id, key))
 */
export const deleteOrAddCartByItemId = (id, key) => (dispatch) => {
  const products = useSelector((state) => state.products.products);
  if (products.length !== 0) {
    const cartItem = products.find((product) => product.id === id);
    if (cartItem !== null && cartItem !== undefined) {
      if (key === 'ADD') {
        dispatch(addToCart(cartItem));
      }
      if (key === 'DELETE') {
        dispatch(deleteFromCart(cartItem));
      }
    }
  }
};

/** 2 варіанти функції якщо ми додаємо або видаляємо товар в state cart через прокидування id:
 * TODO: варіант B:
 * всередині компонента товара ми робимо підписку через useSelector на цей самий об'єкт товара.
 * Якщо точніше, то це не зовсім підписка, а пошук через функціональний селектор необхідних нам
 * даних в останній версії store, завдяки функції useSelector. В самому компоненті потрібно буде
 * прописати такий код:
 * TODO: const fullItemObject = useSelector(deleteOrAddFromCartByItemIdWithValueFromState(id))
 * в константу fullItemObject прийде повний об'єкт цього товара, і при кліку на кнопку
 * "Додати до кошика" (в нашому випадку це знак +), або видалення з кошика
 * ми передаємо в onClick такий код:
 * додати до кошика
 * TODO: onClick={dispatch(addToCart(fullItemObject))}
 * або такий, якщо видалити з кошика
 * TODO: onClick={dispatch(deleteFromCart(fullItemObject))}
 * Попередньо імпортувавши dispatch та addToCart()/deleteFromCart()
 */

export const deleteOrAddFromCartByItemIdWithValueFromState = (id) => (state) => {
  const products = allProducts(state);
  console.log(products);
  if (products.length !== 0) {
    const cartItem = products.find((product) => product.id === id);
    console.log(cartItem);
    if (cartItem !== null && cartItem !== undefined) {
      return cartItem;
    }
    return null;
  }
  return null;
};

export default cartSlice.reducer;
