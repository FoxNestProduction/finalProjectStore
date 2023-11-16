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
    try {
      const { data } = await instance.post('/cart', cart);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
);

export const updateCart = createAsyncThunk(
  'cart/updateCart',
  async (cartProducts, { rejectWithValue }) => {
    const updatedCart = changeCartObjectFromServer(cartProducts);
    try {
      const response = await instance.put('/cart', updatedCart);
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  },
);

export const fetchCart = createAsyncThunk(
  'caer/fetchCart',
  async (_, { rejectWithValue, dispatch, getState }) => {
    const cartProducts = getState().cart.cart.products;
    try {
      if (cartProducts.length !== 0) {
        dispatch(updateCart(cartProducts));
      }
      const { data, status } = await instance.get('/cart');
      if (status === 200 && data === null) {
        dispatch(createCart());
      }
      return data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  },
);

export const addProductToCart = createAsyncThunk(
  'cart/addProductToCart',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await instance.put(`/cart/${id}`);
      return data.products;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  },
);

export const decreaseProductQuantity = createAsyncThunk(
  'cart/decreaseProductQuantity',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await instance.delete(`/cart/product/${id}`);
      return data.products;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  },
);

export const deleteProductFromCart = createAsyncThunk(
  'cart/deleteProductFromCart',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await instance.delete(`/cart/${id}`);
      return data.products;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  },
);

export const deleteCart = createAsyncThunk(
  'cart/deleteCart',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.delete('/cart');
      return data;
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
        state.cart.products.push(action.payload);
      } else {
        const index = state.cart.products
          .findIndex((productObj) => productObj.product._id === action.payload.product._id);
        if (index === -1) {
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
        state.isCart = true;
        state.loading = false;
      })
      .addCase(createCart.rejected, (state, action) => {
        if (action.payload.status === 400) {
          state.isCart = true;
        } else {
          state.isCart = false;
        }
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCart.pending, setLoading)
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateCart.rejected, setError)
      .addCase(fetchCart.pending, setLoading)
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload !== null) {
          state.cart.products = action.payload.products;
        }
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isCart = false;
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addProductToCart.pending, setLoading)
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart.products = action.payload;
      })
      .addCase(addProductToCart.rejected, setError)
      .addCase(decreaseProductQuantity.pending, setLoading)
      .addCase(decreaseProductQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cart.products = action.payload;
      })
      .addCase(decreaseProductQuantity.rejected, setError)
      .addCase(deleteProductFromCart.pending, setLoading)
      .addCase(deleteProductFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart.products = action.payload;
      })
      .addCase(deleteProductFromCart.rejected, setError)
      .addCase(deleteCart.pending, setLoading)
      .addCase(deleteCart.fulfilled, (state) => {
        state.loading = false;
        state.cart.products = [];
      })
      .addCase(deleteCart.rejected, setError);
  },
});

export const {
  addToCart,
  setCart,
  deleteFromCart,
  setIsCart,
  addOneMore,
  resetCart,
  deleteFullProduct,
} = cartSlice.actions;

export default cartSlice.reducer;

/*
1. Вирішити щось з reducers які ми не використовуємо
2. Вирішити як буде проходити зляття кошику коли неавторизований користувач

3. Прописати логіку додавання в кошик коли користувач не авторизований
*/
