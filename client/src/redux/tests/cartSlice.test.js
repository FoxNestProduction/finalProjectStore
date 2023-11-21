import cartReducer, {
  addToCart,
  setCart,
  deleteFromCart,
  setIsCart,
  addOneMore,
  resetCart,
  deleteFullProduct,
  createCart,
  fetchCart,
  fetchCartAfterAuthorization,
  addProductToCart,
  decreaseProductQuantity,
  deleteCart,
} from '../slices/cartSlice';
import { instance } from '../../API/instance';

const initialState = {
  cart: {
    products: [],
  },
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

  test('should delete from cart product with "deleteFromCart" action if quantity is 1', () => {
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
});

// ------- tests -------
describe('cartSlice', () => {
  test('should add favourite product with "addFavourite" action', () => {
    const favProduct = [{ name: 'Avocado Veggie Burger', currentPrice: '11.49', _id: '123' }];
    const state = cartReducer(undefined, addFavourite(favProduct));
    expect(state.cart).toContainEqual(favProduct[0]);
  });

  test('should set isFavourite with "setIsFavourite" action', () => {
    const id = '123';
    const state = cartReducer(undefined, setIsFavourite(id));
    expect(state.cardStates[id]).toBe(true);
    expect(state.loading).toBe(true);
  });

  test('should set loading to false with "setIsLoading" action', () => {
    const prevState = {
      ...initialState,
      loading: true,
    };
    const state = cartReducer(prevState, setIsLoading());
    expect(state.loading).toBe(false);
  });

  test('should remove favourite product with "removeFavourite" action', () => {
    const prevState = {
      ...initialState,
      cart: [
        { name: 'Avocado Veggie Burger', currentPrice: '11.49', _id: '123' },
        { name: 'Vegan Burger', currentPrice: '12.49', _id: '456' },
      ],
      cardStates: {
        '123': true,
        '456': true,
      },
      loading: false,
    };
    const idToRemove = '123';
    const state = cartReducer(prevState, removeFavourite(idToRemove));
    expect(state.cart.some((item) => item._id === idToRemove)).toBe(false);
    expect(state.cardStates[idToRemove]).toBeUndefined();
    expect(state.loading).toBe(true);
  });

  test('should reset cardStates and cart with "resetCardStates" action', () => {
    const prevState = {
      ...initialState,
      cart: [
        { name: 'Avocado Veggie Burger', currentPrice: '11.49', _id: '123' },
        { name: 'Vegan Burger', currentPrice: '12.49', _id: '456' },
      ],
      cardStates: {
        '123': true,
        '456': true,
      },
    };
    const state = cartReducer(prevState, resetCardStates());
    expect(state.cardStates).toEqual({});
    expect(state.cart).toEqual([]);
  });
});

describe('cartSlice extraReducers', () => {
  test('should change status with "fetchFavourites.pending" action', () => {
    const prevState = {
      ...initialState,
      loading: false,
      error: 'error',
    };
    const state = cartReducer(prevState, fetchFavourites.pending());
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('should fetch cart with "fetchFavourites.fulfilled" action', () => {
    const prevState = {
      ...initialState,
      loading: true,
    };
    const cart = [
      { _id: '123', name: 'Cheeseburger', price: '10.99' },
      { _id: '456', name: 'Cesar Salad', price: '12.99' },
    ];

    const state = cartReducer(prevState, fetchFavourites.fulfilled(cart));
    expect(state.loading).toBe(false);
    expect(state.cart).toEqual(cart);
    cart.forEach(({ _id }) => {
      expect(state.cardStates[_id]).toBe(true);
    });
  });

  test('should change status with "fetchFavourites.rejected" action', () => {
    const prevState = {
      ...initialState,
      loading: true,
      error: null,
    };
    const errorMessage = 'Something went wrong.';
    const action = {
      type: fetchFavourites.rejected.type,
      payload: errorMessage,
    };
    const state = cartReducer(prevState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});

jest.mock('../../API/instance');

describe('cartThunk fetchFavourites', () => {
  test('should fetchFavourites with resolved response', async () => {
    const mockFavourites = [
      { _id: '123', name: 'Cheeseburger', price: '10.99' },
      { _id: '456', name: 'Cesar Salad', price: '12.99' },
    ];

    instance.get.mockResolvedValue({ data: { products: mockFavourites } });
    const dispatch = jest.fn();

    const thunk = fetchFavourites();
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;

    expect(start[0].type).toBe('cart/fetchFavourites/pending');
    expect(end[0].type).toBe('cart/fetchFavourites/fulfilled');
    expect(end[0].payload).toEqual(mockFavourites);

    expect(instance.get).toHaveBeenCalledWith('/wishlist');
  });

  test('should fetchFavourites with rejected response', async () => {
    instance.get.mockRejectedValue({ response: { data: { message: 'Something went wrong' } } });

    const dispatch = jest.fn();
    const thunk = fetchFavourites();
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;

    expect(start[0].type).toBe('cart/fetchFavourites/pending');
    expect(end[0].type).toBe('cart/fetchFavourites/rejected');
    expect(end[0].payload.message).toBe('Something went wrong');
    expect(end[0].meta.rejectedWithValue).toBe(true);

    expect(instance.get).toHaveBeenCalledWith('/wishlist');
  });
});

// ---------- ❗️❗️❗️testing cart async functions ❗️❗️❗️ ----------
