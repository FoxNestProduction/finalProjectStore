/* eslint-disable no-underscore-dangle */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { allProducts } from './productsSlice';
import { instance } from '../../API/instance';
import { setLoading, setError } from '../extraReducersHelpers';
import { changeCartObjectFromServer } from '../../components/Cart/cartFunctions';

const initialState = {
  cart: {
    products: [],
  },
  loading: false,
  isCart: false,
  error: null,
};

/* eslint-disable no-param-reassign */

export const createCart = createAsyncThunk(
  'cart/createCart',
  async (_, { rejectWithValue, getState }) => {
    const cartProducts = getState().cart.cart.products;
    const cart = changeCartObjectFromServer(cartProducts);
    console.log('Ми в функції createCart');
    try {
      const response = await instance.post('/cart', cart);
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateCart = createAsyncThunk(
  'cart/updateCart',
  async (cartProducts, { rejectWithValue }) => {
    const updatedCart = changeCartObjectFromServer(cartProducts);
    console.log(updatedCart);
    try {
      const responce = await instance.put('/cart', updatedCart);
      console.log(responce);
      return responce;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
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
    // setLoading(state, action) {
    //   state.loading = action.payload;
    // },
    setIsCart(state, action) {
      state.isCart = action.payload;
    },
    deleteFromCart(state, action) {
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
    deleteFullProduct(state, action) {
      if (state.cart.products.length) {
        const index = state.cart.products
          .findIndex((productObj) => productObj.product._id === action.payload.product._id);
        if (index !== -1) {
          state.cart.products.splice(index, 1);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCart.pending, setLoading)
      .addCase(createCart.fulfilled, (state, action) => {
        console.log(state.cart.products);
        console.log(action.payload);
        state.isCart = true;
        state.loading = false;
      })
      // .addCase(createCart.rejected, setError);
      .addCase(createCart.rejected, (state, action) => {
        console.log('Помилка');
        state.isCart = true;
        state.loading = false;
        state.error = action.payload; // подивитись що приходить сюди в помилку
      }) // тут може бути помилка 2-х типів: або помилка запита
      // або кошик вже існує - цю помилку потрібно обробити разом
      // із властивістю isCart!!!
      // Кошик не створюється, якщо надсилається запит з порожнім масивом
      // Логіка така, при додаванні товара - перевіряти state isCart,
      // якщо false - то спочатку створювати кошик з цим item-ом, а вже потім
      // коли після першого додавання товара кошик створився вже йти за логікою
      // просто додавання товара
      .addCase(updateCart.pending, setLoading)
      .addCase(updateCart.fulfilled, (state, action) => {
        console.log(state.cart.product);
        console.log(action.payload);
      })
      .addCase(updateCart.rejected, setError);
  },
});

export const {
  addToCart,
  setCart,
  // setLoading,
  deleteFromCart,
  setIsCart,
  addOneMore,
  resetCart,
  deleteFullProduct,
} = cartSlice.actions;

/* change on CreatAsyncThuk */
export const getCartItemsFromServer = () => async (dispatch) => {
  try {
    // dispatch(setLoading(true));

    const { data } = await instance.get('/cart');

    dispatch(setCart(data.products));
    dispatch(setIsCart(true));
    // dispatch(setLoading(false));
  } catch (error) {
    console.warn('Error loading cart:', error);
    // dispatch(setLoading(false));
    // dispatch(setIsCart(false));
  }
};

export default cartSlice.reducer;
