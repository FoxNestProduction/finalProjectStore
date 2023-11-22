/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-extraneous-dependencies
import isEqualWith from 'lodash.isequalwith';
// eslint-disable-next-line import/no-extraneous-dependencies
import uniq from 'lodash.uniq';
import { instance } from '../../API/instance';
import { setLoading, setError } from '../extraReducersHelpers';
import { changeCartObjectFromServer } from '../../components/Cart/cartFunctions';

const initialState = {
  cart: {
    products: [],
  },
  restaurants: [],
  loading: false,
  isCart: false,
  error: null,
  authorizationReqInProgress: false,
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

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue, dispatch, getState }) => {
    const cartProducts = getState().cart.cart.products;
    try {
      const { data, status } = await instance.get('/cart');
      if (status === 200 && data === null) {
        dispatch(createCart());
      }
      if (cartProducts.length) {
        const result = isEqualWith(data.products, cartProducts, (serverObj, stateObj, key) => {
          if (key === 'date') {
            return true;
          }
          return undefined;
        });
        if (result) {
          return null;
        }
      }
      if (data !== null) {
        dispatch(setRestaurants(data.products));
      }
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const fetchCartAfterAuthorization = createAsyncThunk(
  'cart/fetchCartAfterAuthorization',
  async (_, { rejectWithValue, dispatch, getState }) => {
    const cartProducts = getState().cart.cart.products;
    try {
      const { data, status } = await instance.get('/cart');
      if (status === 200 && data === null) {
        dispatch(createCart());
      }
      if (cartProducts.length && data !== null) {
        dispatch(setCart(data.products));
        const newCartProducts = getState().cart.cart.products;
        const updatedCart = changeCartObjectFromServer(newCartProducts);
        const response = await instance.put('/cart', updatedCart);
        dispatch(setRestaurants(response.data.products));
        return response.data;
      }
      dispatch(setRestaurants(data.products));
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const addProductToCart = createAsyncThunk(
  'cart/addProductToCart',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await instance.put(`/cart/${id}`);
      dispatch(setRestaurants(data.products));
      return data.products;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const decreaseProductQuantity = createAsyncThunk(
  'cart/decreaseProductQuantity',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await instance.delete(`/cart/product/${id}`);
      dispatch(setRestaurants(data.products));
      return data.products;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const deleteProductFromCart = createAsyncThunk(
  'cart/deleteProductFromCart',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await instance.delete(`/cart/${id}`);
      dispatch(setRestaurants(data.products));
      return data.products;
    } catch (err) {
      return rejectWithValue(err);
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
      return rejectWithValue(err);
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
      const { products } = state.cart;
      if (products.length === 0) {
        state.cart.products = action.payload;
      } else {
        const uniqueProducts = action.payload.filter((objectFromServer) => (
          !products.some((stateObj) => stateObj.product._id === objectFromServer.product._id)
        ));
        const notUniqueProducts = action.payload.filter((objectFromServer) => (
          products.some((stateObj) => stateObj.product._id === objectFromServer.product._id)
        ))
          .map((objectFromServer) => {
            const matchedProduct = state.cart.products
              .find((cartProduct) => cartProduct.product._id === objectFromServer.product._id);
            objectFromServer.cartQuantity += matchedProduct.cartQuantity;
            return objectFromServer;
          });
        const newProducts = products.filter((stateObj) => {
          return !action.payload.some((objectFromServer) => (
            objectFromServer.product._id === stateObj.product._id));
        });
        state.cart.products = [
          ...uniqueProducts,
          ...notUniqueProducts,
          ...newProducts,
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
    setRestaurants(state, action) {
      let restaurants = [];
      const { products } = state.cart;
      if (action.payload && action.payload.length) {
        restaurants = action.payload;
      } else if (products.length) {
        restaurants = products;
      }
      if (restaurants.length) {
        state.restaurants = uniq(restaurants.map((prodactObj) => {
          return prodactObj.product.restaurant_name;
        }));
      } else {
        state.restaurants = [];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCart.pending, setLoading)
      .addCase(createCart.fulfilled, (state) => {
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
        state.error = action.payload.data.message;
      })

      .addCase(fetchCart.pending, setLoading)
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload !== null) {
          state.cart.products = action.payload.products;
        }
      })
      .addCase(fetchCart.rejected, (state, action) => {
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
      .addCase(deleteCart.rejected, setError)

      .addCase(fetchCartAfterAuthorization.pending, (state, action) => {
        state.authorizationReqInProgress = true;
        state.loading = true;
      })
      .addCase(fetchCartAfterAuthorization.fulfilled, (state, action) => {
        state.isCart = true;
        state.loading = false;
        if (action.payload !== null) {
          state.cart.products = action.payload.products;
        }
        state.authorizationReqInProgress = false;
      })
      .addCase(fetchCartAfterAuthorization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.authorizationReqInProgress = false;
      });
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
  setRestaurants,
} = cartSlice.actions;

export default cartSlice.reducer;
