import productsReducer, {
  fetchTopProducts,
  fetchSortedProducts,
  fetchAllProductsNames,
  getOneProduct,
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

  // --------- fetchTopProducts extraReducer ---------
  test('should change status with "fetchTopProducts.pending" action', () => {
    const prevState = {
      ...initialState,
      loading: false,
      error: 'error',
    };
    const state = productsReducer(prevState, fetchTopProducts.pending());
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('should fetch top products with "fetchTopProducts.fulfilled" action', () => {
    const prevState = {
      ...initialState,
      loading: true,
    };
    const products = [
      { itemNo: '123', name: 'Cheeseburger', price: '10.99' },
      { itemNo: '456', name: 'Cesar Salad', price: '12.99' },
    ];

    const state = productsReducer(prevState, fetchTopProducts.fulfilled(products));
    expect(state.topProducts).toEqual(products);
    expect(state.loading).toBe(false);
  });

  test('should change status with "fetchTopProducts.rejected" action', () => {
    const prevState = {
      ...initialState,
      loading: true,
    };
    const errorMessage = 'Something went wrong.';
    const action = {
      type: fetchTopProducts.rejected.type,
      payload: errorMessage,
    };
    const state = productsReducer(prevState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  // --------- fetchSortedProducts extraReducer ---------
  test('should fetch sorted products with "fetchSortedProducts.fulfilled" action', () => {
    const productsData = { products: [
      { itemNo: '123', name: 'Cheeseburger', price: '10.99' },
      { itemNo: '456', name: 'Cesar Salad', price: '12.99' },
    ],
    productsQuantity: 2 };

    const state = productsReducer(initialState, fetchSortedProducts.fulfilled(productsData));
    expect(state.products).toEqual(productsData.products);
    expect(state.productsQuantity).toEqual(2);
  });

  // --------- getOneProduct extraReducer ---------
  test('should fetch one product with "getOneProduct.fulfilled" action', () => {
    const product = { itemNo: '123', name: 'Cheeseburger', price: '10.99' };
    const state = productsReducer(initialState, getOneProduct.fulfilled(product));
    expect(state.oneProduct).toEqual(product);
  });

  // --------- fetchAllProductsNames extraReducer ---------
  test('should fetch all products names with "fetchAllProductsNames.fulfilled" action', () => {
    const productsNames = ['Cheeseburger', 'Cesar Salad', 'Cheese Pizza'];
    const state = productsReducer(initialState, fetchAllProductsNames.fulfilled(productsNames));
    expect(state.allProductsNames).toEqual(productsNames);
  });
});

jest.mock('../../API/instance');

// --------- fetchTopProducts asyncThunk ----------
describe('productsThunk fetchTopProducts', () => {
  test('should fetchTopProducts with resolved response', async () => {
    const mockTopProducts = [
      { itemNo: '123', name: 'Cheeseburger', price: '10.99' },
      { itemNo: '456', name: 'Cesar Salad', price: '12.99' },
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

// --------- fetchAllProductsNames asyncThunk ----------
describe('productsThunk fetchAllProductsNames', () => {
  test('should fetchAllProductsNames with resolved response', async () => {
    const productsNames = ['Cheeseburger', 'Cesar Salad', 'Cheese Pizza'];

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

// --------- fetchSortedProducts asyncThunk ----------
describe('productsThunk fetchSortedProducts', () => {
  test('should fetchSortedProducts with resolved response', async () => {
    const queryStr = '?sort=+currentPrice&startPage=1&perPage=15';
    const mockSortedProducts = [
      { itemNo: '123', name: 'Cheeseburger', price: '10.99' },
      { itemNo: '456', name: 'Cesar Salad', price: '12.99' },
    ];

    instance.get.mockResolvedValue({ data: mockSortedProducts });
    const dispatch = jest.fn();

    const thunk = fetchSortedProducts(queryStr);
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;

    expect(start[0].type).toBe('products/fetchSortedProducts/pending');
    expect(end[0].type).toBe('products/fetchSortedProducts/fulfilled');
    expect(end[0].payload).toEqual(mockSortedProducts);

    expect(instance.get).toHaveBeenCalledWith(`/products/filter${queryStr}`);
  });

  test('should fetchSortedProducts with rejected response', async () => {
    const queryStr = '?sort=+currentPrice&startPage=1&perPage=15';
    instance.get.mockRejectedValue({ response: { data: { message: 'Something went wrong' } } });

    const dispatch = jest.fn();
    const thunk = fetchSortedProducts(queryStr);
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;

    expect(start[0].type).toBe('products/fetchSortedProducts/pending');
    expect(end[0].type).toBe('products/fetchSortedProducts/rejected');
    expect(end[0].payload.message).toBe('Something went wrong');
    expect(end[0].meta.rejectedWithValue).toBe(true);

    expect(instance.get).toHaveBeenCalledWith(`/products/filter${queryStr}`);
  });
});

// --------- getOneProduct asyncThunk ----------
describe('productsThunk getOneProduct', () => {
  test('should getOneProduct with resolved response', async () => {
    const itemNo = '123';
    const mockProduct = { itemNo: '123', name: 'Cheeseburger', price: '10.99' };

    instance.get.mockResolvedValue({ data: mockProduct });
    const dispatch = jest.fn();

    const thunk = getOneProduct(itemNo);
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;

    expect(start[0].type).toBe('products/getOneProduct/pending');
    expect(end[0].type).toBe('products/getOneProduct/fulfilled');
    expect(end[0].payload).toEqual(mockProduct);

    expect(instance.get).toHaveBeenCalledWith(`/products/${itemNo}`);
  });

  test('should getOneProduct with rejected response', async () => {
    const itemNo = '123';
    instance.get.mockRejectedValue({ response: { data: { message: 'Something went wrong' } } });

    const dispatch = jest.fn();
    const thunk = getOneProduct(itemNo);
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;

    expect(start[0].type).toBe('products/getOneProduct/pending');
    expect(end[0].type).toBe('products/getOneProduct/rejected');
    expect(end[0].payload.message).toBe('Something went wrong');
    expect(end[0].meta.rejectedWithValue).toBe(true);

    expect(instance.get).toHaveBeenCalledWith(`/products/${itemNo}`);
  });
});
