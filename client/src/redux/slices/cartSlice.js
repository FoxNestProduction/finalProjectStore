/* eslint-disable no-underscore-dangle */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { allProducts } from './productsSlice';
import { instance } from '../../API/instance';
import { setLoading, setError } from '../extraReducersHelpers';
import { updateCartObjFromServer } from '../../components/Cart/cartFunctions';

export const updateCart = createAsyncThunk(
  'cart/updateCart',
  async (cartProducts, { rejectWithValue }) => {
    const updatedCart = updateCartObjFromServer(cartProducts);
    // console.log(updatedCart);
    try {
      const responce = await instance.put('/cart', updatedCart);
      console.log(responce);
      return responce;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  },
);

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
    /* deadth code because we have aextrareduceers helpers setLoading & SetError */
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
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
  setIsLoading,
  deleteFromCart,
  setIsCart,
  addOneMore,
  resetCart,
  deleteFullProduct,
} = cartSlice.actions;

/* change on CreatAsyncThuk */
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

export default cartSlice.reducer;
