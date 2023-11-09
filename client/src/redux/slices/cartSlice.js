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
    console.log(updatedCart);
    try {
      const response = await instance.put('/cart', updatedCart);
      console.log(response);
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  },
);

export const fetchCart = createAsyncThunk(
  'caer/fetchCart',
  async (_, { rejectWithValue, dispatch }) => {
    try {
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
      console.log(data.products);
      return data.products;
    } catch (err) {
      console.warn(err.response);
      return rejectWithValue(err.response);
    }
  },
);

export const decreaseProductQuantity = createAsyncThunk(
  'cart/addProductToCart',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await instance.put(`/cart/${id}`);
      console.log(data.products);
      return data.products;
    } catch (err) {
      console.warn(err.response);
      return rejectWithValue(err.response);
    }
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      console.log(action.payload);
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
        state.isCart = true;
        state.loading = false;
        console.log('Кошик створено!');
        console.log(action.payload);
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
        console.log(state.cart.products);
        console.log(action.payload);
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
      .addCase(addProductToCart.rejected, setError);
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
    console.log(data);
    // dispatch(setCart(data.products));
    dispatch(setIsCart(true));
    // dispatch(setLoading(false));
  } catch (error) {
    console.warn('Error loading cart:', error);
    console.log(error);
    // dispatch(setLoading(false));
    // dispatch(setIsCart(false));
  }
};

export default cartSlice.reducer;
