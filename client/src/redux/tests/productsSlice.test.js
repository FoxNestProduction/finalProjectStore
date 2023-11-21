import productsReducer, {
  resetOneProduct,
  fetchTopProducts,
  fetchSortedProducts,
  fetchAllProductsNames,
  GetOneProduct,
} from '../slices/productsSlice';
import { instance } from '../../API/instance';

const initialState = {
  products: [],
  productsQuantity: null,
  topProducts: [],
  oneProduct: {},
  allProductsNames: [],
  loading: false,
  error: null,
};

describe('productsSlice extraReducers', () => {
  test('should return initial state when passed an empty action', () => {
    expect(productsReducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('should change status with "fetchTopProducts.pending" action', () => {
    const state = productsReducer(initialState, fetchTopProducts.pending());
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('should fetch top products with "fetchTopProducts.fulfilled" action', () => {
    const products = [
      { customId: '17001', name: 'Sushi Delight', isTrending: true },
      { customId: '17002', name: 'Burger Heaven', isTrending: false },
    ];

    const state = productsReducer(initialState, fetchTopProducts.fulfilled(products));
    expect(state.topProducts).toEqual(products);
    expect(state.loading).toBe(false);
  });

  test('should change status with "fetchTopProducts.rejected" action', () => {
    const errorMessage = 'Something went wrong.';
    const action = {
      type: fetchTopProducts.rejected.type,
      payload: errorMessage,
    };
    const state = productsReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  test('should fetch all products names with "fetchAllProductsNames.fulfilled" action', () => {
    const productsNames = ['Sushi Delight', 'Burger Heaven', 'Welcome Pizzeria'];

    const state = productsReducer(initialState, fetchAllProductsNames.fulfilled(productsNames));
    expect(state.allProductsNames).toEqual(productsNames);
    expect(state.loading).toBe(false);
  });
});

jest.mock('../../API/instance');

describe('productsThunk fetchTopProducts', () => {
  test('should fetchTopProducts with resolved response', async () => {
    const mockTopProducts = [
      { customId: '17001', name: 'Sushi Delight', isTrending: true },
      { customId: '17002', name: 'Burger Heaven', isTrending: false },
    ];
    const count = 2;

    instance.get.mockResolvedValue({ data: { products: mockTopProducts } });
    const dispatch = jest.fn();

    const thunk = fetchTopProducts(count);
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;

    expect(start[0].type).toBe('products/fetchTopProducts/pending');
    expect(end[0].type).toBe('products/fetchTopProducts/fulfilled');
    expect(end[0].payload).toEqual(mockTopProducts);

    expect(instance.get).toHaveBeenCalledWith(`/products/filter?perPage=${count}&sort=-rating`);
  });

  test('should fetchTopProducts with rejected response', async () => {
    const count = 2;
    instance.get.mockRejectedValue({ response: { data: { message: 'Something went wrong' } } });

    const dispatch = jest.fn();
    const thunk = fetchTopProducts(count);
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;

    expect(start[0].type).toBe('products/fetchTopProducts/pending');
    expect(end[0].type).toBe('products/fetchTopProducts/rejected');
    expect(end[0].payload.message).toBe('Something went wrong');
    expect(end[0].meta.rejectedWithValue).toBe(true);

    expect(instance.get).toHaveBeenCalledWith(`/products/filter?perPage=${count}&sort=-rating`);
  });
});

describe('productsThunk fetchAllProductsNames', () => {
  test('should fetchAllProductsNames with resolved response', async () => {
    const productsNames = ['Sushi Delight', 'Burger Heaven', 'Welcome Pizzeria'];

    instance.get.mockResolvedValue({ data: productsNames });
    const dispatch = jest.fn();

    const thunk = fetchAllProductsNames();
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;

    expect(start[0].type).toBe('products/fetchAllProductsNames/pending');
    expect(end[0].type).toBe('products/fetchAllProductsNames/fulfilled');
    expect(end[0].payload).toEqual(productsNames);
    expect(end[0].payload.length).toBe(3);

    expect(instance.get).toHaveBeenCalledWith('/products/names');
  });

  test('should fetchAllProductsNames with rejected response', async () => {
    instance.get.mockRejectedValue({ response: { data: { message: 'Something went wrong' } } });

    const dispatch = jest.fn();
    const thunk = fetchAllProductsNames();
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;

    expect(start[0].type).toBe('products/fetchAllProductsNames/pending');
    expect(end[0].type).toBe('products/fetchAllProductsNames/rejected');
    expect(end[0].payload.message).toBe('Something went wrong');
    expect(end[0].meta.rejectedWithValue).toBe(true);

    expect(instance.get).toHaveBeenCalledWith('/products/names');
  });
});
