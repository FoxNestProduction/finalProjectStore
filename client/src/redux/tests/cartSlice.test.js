import cartReducer, {
  addToCart,
  setCart,
  deleteFromCart,
  setIsCart,
  addOneMore,
  resetCart,
  deleteFullProduct,
  setRestaurants,
  createCart,
  fetchCart,
  fetchCartAfterAuthorization,
  addProductToCart,
  decreaseProductQuantity,
  deleteCart, deleteProductFromCart,
} from '../slices/cartSlice';

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

describe('cartSlice reducers', () => {
  test('should return initial state when passed an empty action', () => {
    expect(cartReducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('should add new cart product with "addToCart" action', () => {
    const productCartItem = {
      product: {
        _id: '123',
        name: 'Burger',
        currentPrice: '17.99',
      },
      cartQuantity: 1,
    };
    const state = cartReducer(undefined, addToCart(productCartItem));
    expect(state.cart.products).toContainEqual(productCartItem);
  });

  test('should increase cartQuantity with "addToCart" action', () => {
    const prevState = {
      ...initialState,
      cart: {
        products: [
          { product: { _id: '123', name: 'Burger', currentPrice: '17.99' }, cartQuantity: 1 },
        ],
      },
    };
    const productCartItem = {
      product: {
        _id: '123',
        name: 'Burger',
        currentPrice: '17.99',
      },
      cartQuantity: 1,
    };
    const state = cartReducer(prevState, addToCart(productCartItem));
    const updatedProduct = state.cart.products.find((el) => el.product._id === '123');
    expect(updatedProduct.cartQuantity).toBe(productCartItem.cartQuantity + 1);
  });

  test('should reset cart with "resetCart" action', () => {
    const prevState = {
      ...initialState,
      cart: {
        products: [
          { product: { _id: '123', name: 'Burger', currentPrice: '17.99' }, cartQuantity: 2 },
        ],
      },
    };
    const state = cartReducer(prevState, resetCart());
    expect(state.cart.products).toEqual([]);
  });

  test('should set isCart with "setIsCart" action', () => {
    const prevState = {
      ...initialState,
      isCart: true,
    };
    const state = cartReducer(prevState, setIsCart(false));
    expect(state.isCart).toBe(false);
  });

  test('should delete from cart product if quantity is 1 with "deleteFromCart" action', () => {
    const prevState = {
      ...initialState,
      cart: {
        products: [
          { product: { _id: '123', name: 'Burger', currentPrice: '17.99' }, cartQuantity: 1 },
        ],
      },
    };
    const productCartItem = {
      product: {
        _id: '123',
        name: 'Burger',
        currentPrice: '17.99',
      },
      cartQuantity: 1,
    };
    const state = cartReducer(prevState, deleteFromCart(productCartItem));
    const deletedProduct = state.cart.products.some((el) => el.product._id === '123');
    expect(deletedProduct).toBe(false);
  });

  test('should decrease quantity if quantity is more than 1 with "deleteFromCart" action', () => {
    const prevState = {
      ...initialState,
      cart: {
        products: [
          { product: { _id: '123', name: 'Burger', currentPrice: '17.99' }, cartQuantity: 2 },
        ],
      },
    };
    const productCartItem = {
      product: {
        _id: '123',
        name: 'Burger',
        currentPrice: '17.99',
      },
      cartQuantity: 1,
    };
    const state = cartReducer(prevState, deleteFromCart(productCartItem));
    const decreasedProduct = state.cart.products.find((el) => el.product._id === '123');
    expect(decreasedProduct.cartQuantity).toBe(1);
  });

  test('should set cart if cart state products is empty with "setCart" action', () => {
    const newDataFromServer = [
      { product: { _id: '789', name: 'Salad', currentPrice: '8.99' }, cartQuantity: 1 },
      { product: { _id: '456', name: 'Pizza', currentPrice: '12.99' }, cartQuantity: 2 },
      { product: { _id: '111', name: 'Pasta', currentPrice: '14.99' }, cartQuantity: 1 },
    ];

    const state = cartReducer(undefined, setCart(newDataFromServer));
    expect(state.cart.products).toEqual(newDataFromServer);
  });

  test('should update cart products with "setCart" action', () => {
    const prevState = {
      ...initialState,
      cart: {
        products: [
          { product: { _id: '123', name: 'Burger', currentPrice: '17.99' }, cartQuantity: 2 },
          { product: { _id: '456', name: 'Pizza', currentPrice: '12.99' }, cartQuantity: 1 },
        ],
      },
    };

    const newDataFromServer = [
      { product: { _id: '789', name: 'Salad', currentPrice: '8.99' }, cartQuantity: 1 },
      { product: { _id: '456', name: 'Pizza', currentPrice: '12.99' }, cartQuantity: 2 },
      { product: { _id: '111', name: 'Pasta', currentPrice: '14.99' }, cartQuantity: 1 },
    ];

    // Виклик setCart
    const state = cartReducer(prevState, setCart(newDataFromServer));

    // Очікується, що кошик буде оновлений згідно нових даних з сервера
    expect(state.cart.products).toEqual([
      { product: { _id: '789', name: 'Salad', currentPrice: '8.99' }, cartQuantity: 1 },
      { product: { _id: '111', name: 'Pasta', currentPrice: '14.99' }, cartQuantity: 1 },
      { product: { _id: '456', name: 'Pizza', currentPrice: '12.99' }, cartQuantity: 3 },
      { product: { _id: '123', name: 'Burger', currentPrice: '17.99' }, cartQuantity: 2 },
    ]);
  });

  test('should increase cartQuantity by 1 with "addOneMore" action', () => {
    const prevState = {
      ...initialState,
      cart: {
        products: [
          { product: { _id: '123', name: 'Burger', currentPrice: '17.99' }, cartQuantity: 2 },
        ],
      },
    };
    const productCartItem = {
      product: {
        _id: '123',
        name: 'Burger',
        currentPrice: '17.99',
      },
      cartQuantity: 1,
    };
    const state = cartReducer(prevState, addOneMore(productCartItem));
    const updatedProduct = state.cart.products.find((el) => el.product._id === '123');
    expect(updatedProduct.cartQuantity).toBe(prevState.cart.products[0].cartQuantity + 1);
  });

  test('should remove product from cart with "deleteFullProduct" action', () => {
    const prevState = {
      ...initialState,
      cart: {
        products: [
          { product: { _id: '123', name: 'Burger', currentPrice: '17.99' }, cartQuantity: 2 },
          { product: { _id: '456', name: 'Pizza', currentPrice: '12.99' }, cartQuantity: 1 },
        ],
      },
    };
    const productCartItem = {
      product: {
        _id: '123',
        name: 'Burger',
        currentPrice: '17.99',
      },
    };
    const state = cartReducer(prevState, deleteFullProduct(productCartItem));
    const updatedCart = state.cart.products;

    // Очікується, що продукт буде видалено з кошика
    expect(updatedCart.some((el) => el.product._id === '123')).toBe(false);
    // Очікується, що інші продукти в кошику залишаться
    expect(updatedCart.length).toBe(prevState.cart.products.length - 1);
  });

  test('should set unique restaurant names with "setRestaurants" action', () => {
    const prevState = {
      ...initialState,
      cart: {
        products: [
          { product: { _id: '123', name: 'Burger', currentPrice: '17.99', restaurant_name: 'BurgerPlace' }, cartQuantity: 2 },
          { product: { _id: '456', name: 'Pizza', currentPrice: '12.99', restaurant_name: 'PizzaHub' }, cartQuantity: 1 },
        ],
      },
    };
    const restaurantNames = ['BurgerPlace', 'PizzaHub'];

    const state = cartReducer(prevState, setRestaurants());
    const updatedRestaurants = state.restaurants;
    expect(updatedRestaurants).toEqual(restaurantNames);
  });

  test('should set empty restaurants array with "setRestaurants" action when cart is empty and no payload', () => {
    const prevState = {
      ...initialState,
      cart: {
        products: [],
      },
    };

    const state = cartReducer(prevState, setRestaurants());
    expect(state.restaurants).toEqual([]);
  });
});

// ---------- тести для extraReducers ----------

describe('cartSlice extraReducers', () => {
  // ---------- createCart test ----------
  test('should change status with "createCart.pending" action', () => {
    const prevState = {
      ...initialState,
      loading: false,
      error: 'error',
    };
    const state = cartReducer(prevState, createCart.pending());
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('should set isCart to true, loading to false with "createCart.fulfilled" action', () => {
    const prevState = {
      ...initialState,
      isCart: false,
      loading: true,
    };
    const state = cartReducer(prevState, createCart.fulfilled());
    expect(state.isCart).toBe(true);
    expect(state.loading).toBe(false);
  });

  test('should set isCart to true, loading to false, and error to payload with "createCart.rejected" action', () => {
    const prevState = {
      ...initialState,
      isCart: false,
      loading: true,
      error: null,
    };
    const errorMessage = 'Something went wrong.';
    const action = {
      type: createCart.rejected.type,
      payload: { status: 400, data: { message: errorMessage } },
    };
    const state = cartReducer(prevState, action);
    expect(state.isCart).toBe(true);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Something went wrong.');
  });

  // ---------- fetchCart test ----------
  test('should set loading to true with "fetchCart.pending" action', () => {
    const prevState = {
      ...initialState,
      loading: false,
      error: 'error',
    };

    const state = cartReducer(prevState, fetchCart.pending());
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('should set loading to false and update cart products with "fetchCart.fulfilled" action', () => {
    const prevState = {
      ...initialState,
      loading: true,
      cart: {
        products: [],
      },
    };

    const cartData = {
      products: [
        { _id: '123', name: 'Cheeseburger', price: '10.99' },
        { _id: '456', name: 'Cesar Salad', price: '12.99' },
      ],
    };

    const state = cartReducer(prevState, fetchCart.fulfilled(cartData));
    expect(state.loading).toBe(false);
    expect(state.cart.products).toEqual(cartData.products);
  });

  test('should set loading to false and update error with "fetchCart.rejected" action', () => {
    const prevState = {
      ...initialState,
      loading: true,
      error: null,
    };

    const errorMessage = 'Error fetching cart data';
    const action = {
      type: fetchCart.rejected.type,
      payload: errorMessage,
    };
    const state = cartReducer(prevState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  // ---------- addProductToCart test ----------

  test('should change status with "addProductToCart.pending" action', () => {
    const prevState = {
      ...initialState,
      loading: false,
      error: 'error',
    };
    const state = cartReducer(prevState, addProductToCart.pending());
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('should set loading to false and update cart products with "addProductToCart.fulfilled" action', () => {
    const prevState = {
      ...initialState,
      loading: true,
      cart: {
        products: [],
      },
    };
    const cartData = [
      { _id: '123', name: 'Cheeseburger', price: '10.99' },
      { _id: '456', name: 'Cesar Salad', price: '12.99' },
    ];

    const action = addProductToCart.fulfilled(cartData);
    const state = cartReducer(prevState, action);
    expect(state.loading).toBe(false);
    expect(state.cart.products).toEqual(cartData);
  });

  test('should change status with "addProductToCart.rejected" action', () => {
    const prevState = {
      ...initialState,
      loading: true,
      error: null,
    };
    const action = {
      type: addProductToCart.rejected.type,
      payload: 'Something went wrong',
    };
    const state = cartReducer(prevState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Something went wrong');
  });

  // ---------- decreaseProductQuantity test ----------

  test('should change status with "decreaseProductQuantity.pending" action', () => {
    const prevState = {
      ...initialState,
      loading: false,
      error: 'error',
    };
    const state = cartReducer(prevState, decreaseProductQuantity.pending());
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('should set loading to false and update cart products with decreased quantity with "decreaseProductQuantity.fulfilled" action', () => {
    const prevState = {
      ...initialState,
      loading: true,
      cart: {
        products: [
          { product: { _id: '123', name: 'Cheeseburger', price: '10.99' }, cartQuantity: 2 },
        ],
      },
    };
    const updatedCartData = [
      { product: { _id: '123', name: 'Cheeseburger', price: '10.99' }, cartQuantity: 1 },
    ];

    const action = decreaseProductQuantity.fulfilled(updatedCartData);
    const state = cartReducer(prevState, action);
    expect(state.loading).toBe(false);
    expect(state.cart.products).toEqual(updatedCartData);
  });

  test('should change status with "decreaseProductQuantity.rejected" action', () => {
    const prevState = {
      ...initialState,
      loading: true,
      error: null,
    };
    const action = {
      type: decreaseProductQuantity.rejected.type,
      payload: 'Something went wrong',
    };
    const state = cartReducer(prevState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Something went wrong');
  });

  // ---------- deleteProductFromCart test ----------

  test('should change status with "deleteProductFromCart.pending" action', () => {
    const prevState = {
      ...initialState,
      loading: false,
      error: 'error',
    };
    const state = cartReducer(prevState, deleteProductFromCart.pending());
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('should set loading to false and update cart products with deleted product with "deleteProductFromCart.fulfilled" action', () => {
    const prevState = {
      ...initialState,
      loading: true,
      cart: {
        products: [
          { product: { _id: '123', name: 'Cheeseburger', price: '10.99' }, cartQuantity: 2 },
          { product: { _id: '456', name: 'Cesar Salad', price: '12.99' }, cartQuantity: 1 },
        ],
      },
    };
    const updatedCartData = [
      { product: { _id: '123', name: 'Cheeseburger', price: '10.99' }, cartQuantity: 2 },
    ];

    const action = deleteProductFromCart.fulfilled(updatedCartData);
    const state = cartReducer(prevState, action);
    expect(state.loading).toBe(false);
    expect(state.cart.products).toEqual(updatedCartData);
  });

  test('should change status with "deleteProductFromCart.rejected" action', () => {
    const prevState = {
      ...initialState,
      loading: true,
      error: null,
    };
    const action = {
      type: deleteProductFromCart.rejected.type,
      payload: 'Something went wrong',
    };
    const state = cartReducer(prevState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Something went wrong');
  });

  // ---------- deleteCart test ----------

  test('should change status with "deleteCart.pending" action', () => {
    const prevState = {
      ...initialState,
      loading: false,
      error: 'error',
    };
    const state = cartReducer(prevState, deleteCart.pending());
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('should set loading to false and clear cart products with "deleteCart.fulfilled" action', () => {
    const prevState = {
      ...initialState,
      loading: true,
      cart: {
        products: [
          { product: { _id: '123', name: 'Cheeseburger', price: '10.99' }, cartQuantity: 2 },
          { product: { _id: '456', name: 'Cesar Salad', price: '12.99' }, cartQuantity: 1 },
        ],
      },
    };

    const action = deleteCart.fulfilled();
    const state = cartReducer(prevState, action);

    expect(state.loading).toBe(false);
    expect(state.cart.products).toEqual([]);
  });

  test('should change status with "deleteCart.rejected" action', () => {
    const prevState = {
      ...initialState,
      loading: true,
      error: null,
    };
    const action = {
      type: deleteCart.rejected.type,
      payload: 'Something went wrong',
    };
    const state = cartReducer(prevState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Something went wrong');
  });

  // ---------- fetchCartAfterAuthorization test ----------

  test('should set loading and authorizationReqInProgress to true with "fetchCartAfterAuthorization.pending" action', () => {
    const prevState = {
      ...initialState,
      loading: false,
      authorizationReqInProgress: false,
    };

    const action = fetchCartAfterAuthorization.pending();
    const state = cartReducer(prevState, action);
    expect(state.loading).toBe(true);
    expect(state.authorizationReqInProgress).toBe(true);
  });

  test('should set loading to false, isCart to true, and update cart products with "fetchCartAfterAuthorization.fulfilled" action', () => {
    const prevState = {
      ...initialState,
      loading: true,
      authorizationReqInProgress: true,
      isCart: false,
      cart: {
        products: [
          { product: { _id: '123', name: 'Cheeseburger', price: '10.99' }, cartQuantity: 2 },
          { product: { _id: '456', name: 'Cesar Salad', price: '12.99' }, cartQuantity: 1 },
        ],
      },
    };
    const cartData = {
      products: [
        { product: { _id: '789', name: 'Veggie Wrap', price: '8.99' }, cartQuantity: 3 },
      ],
    };

    const action = fetchCartAfterAuthorization.fulfilled(cartData);
    const state = cartReducer(prevState, action);

    expect(state.loading).toBe(false);
    expect(state.authorizationReqInProgress).toBe(false);
    expect(state.isCart).toBe(true);
    expect(state.cart.products).toEqual(cartData.products);
  });

  test('should set loading to false, authorizationReqInProgress to false, and update error with "fetchCartAfterAuthorization.rejected" action', () => {
    const prevState = {
      ...initialState,
      loading: true,
      authorizationReqInProgress: true,
      error: null,
    };

    const errorMessage = 'Authorization failed';
    const action = {
      type: fetchCartAfterAuthorization.rejected.type,
      payload: errorMessage,
    };
    const state = cartReducer(prevState, action);

    expect(state.loading).toBe(false);
    expect(state.authorizationReqInProgress).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
