/* eslint-disable no-underscore-dangle */
import { createSlice } from '@reduxjs/toolkit';
import { allProducts } from './productsSlice';
import { instance } from '../../API/instance';

const initialState = {
  cart: {
    products: [],
  },
  isLoading: false,
  isCart: true,
};

/* eslint-disable no-param-reassign */

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      console.log(action.payload);
      // 1-ий варіант - коли нам в action.payload надходить повний об'єкт item
      if (state.cart.products.length === 0 && action.payload !== null) {
        action.payload.cartQuantity = 1;
        state.cart.products.push(action.payload);
      } else {
        const index = state.cart.products
          .findIndex((productObj) => productObj.product._id === action.payload.product._id);
        if (index === -1) {
          action.payload.cartQuantity = 1;
          state.cart.products.push(action.payload);
        } else {
          state.cart.products[index].cartQuantity += 1;
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
      if (state.cart.products.length === 0) {
        state.cart.products = action.payload;
      } else {
        const uniqueFilteredProducts = action.payload.filter((cartProductObj) => {
          const matchedProduct = state.cart.products
            .find((cartProduct) => cartProduct.product._id !== cartProductObj.product._id);
          const mark = matchedProduct !== undefined;
          return mark;
        });
        const notUniqueFilteredProducts = action.payload.filter((cartProductObj) => {
          const matchedProduct = state.cart.products
            .find((cartProduct) => cartProduct.product._id === cartProductObj.product._id);
          const mark = matchedProduct !== undefined;
          return mark;
        }).map((cartProductObj) => {
          const matchedProduct = state.cart.products
            .find((cartProduct) => cartProduct.product._id === cartProductObj.product._id);
          cartProductObj.cartQuantity += matchedProduct.cartQuantity;
          return cartProductObj;
        });
        const uniqueFilteredProductsFromStore = state.cart.products.filter((cartProductObj) => {
          const uniqueStoreProducts = action.payload
            .find((cartProduct) => cartProduct.product._id === cartProductObj.product._id);
          const mark = uniqueStoreProducts === undefined;
          return mark;
        });
        state.cart.products = [
          ...uniqueFilteredProducts,
          ...notUniqueFilteredProducts,
          ...uniqueFilteredProductsFromStore,
        ];
      }
    },
    resetCart(state) {
      state.cart.products = [];
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setIsCart(state, action) {
      state.isCart = action.payload;
    },
    deleteFromCart(state, action) {
      // 1 - ий варіант - коли нам в action.payload надходить повний об'єкт item
      if (state.cart.products.length) {
        const index = state.cart.products
          .findIndex((productObj) => productObj.product._id === action.payload.product._id);
        if (index !== -1) {
          if (state.cart.products[index].cartQuantity === 1) {
            state.cart.products.splice(index, 1);
          } else {
            state.cart.products[index].cartQuantity -= 1;
          }
        }
      }
      /** 2-ий варіант, коли нам приходить суто id товара потрібно звернутись
         * до однієї з двох написаних нижче функцій:
         * - deleteOrAddCartByItemId , або
         * - deleteOrAddFromCartByItemIdWithValueFromState
         * Потрібно буде протестувати, який варіант зручніше, той і використовувати
         */
    },
    addOneMore(state, action) {
      if (state.cart.products.length) {
        const index = state.cart.products
          .findIndex((productObj) => productObj.product._id === action.payload.product._id);
        if (index !== -1) {
          state.cart.products[index].cartQuantity += 1;
        }
      }
    },
  },
});

export const {
  addToCart,
  setCart,
  setIsLoading,
  deleteFromCart,
  setIsCart,
  addOneMore,
  resetCart,
} = cartSlice.actions;

export const getCartItemsFromServer = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));

    const { data } = await instance.get('/cart');

    dispatch(setCart(data.products));
    dispatch(setIsCart(true));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.warn('Error loading cart:', error);
    dispatch(setIsLoading(false));
    // dispatch(setIsCart(false));
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
export const deleteOrAddCartByItemId = (id, key) => (dispatch, getState) => {
  const state = getState();
  const { products } = state.products;
  if (products.length !== 0) {
    const cartItem = products.find((product) => product._id === id);
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
  if (products.length !== 0) {
    const cartItem = products.find((product) => product._id === id);
    if (cartItem !== null && cartItem !== undefined) {
      return cartItem;
    }
    return null;
  }
  return null;
};

export default cartSlice.reducer;
