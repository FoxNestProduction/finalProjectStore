import filterReducer, { setFilterParams,
  deleteFilteredData,
  resetFilterParams,
  fetchFilteredProducts } from '../slices/filterSlice';
import { instance } from '../../API/instance';

const initialState = {
  filteredProducts: [],
  productsQuantity: null,
  loading: false,
  error: null,
  nothingFound: false,
  filterParams: {
    filterCategories: [],
    isTrending: false,
    rating: null,
    isHealthy: false,
    isSupreme: false,
    minPrice: 0,
    maxPrice: 30,
    sort: '',
    startPage: 1,
    perPage: 10,
  },
};

const filters = {
  filterCategories: ['pizza', 'sushi'],
  isTrending: true,
  rating: 5,
  isHealthy: true,
  isSupreme: true,
  minPrice: 10,
  maxPrice: 23,
  sort: '+price',
  startPage: 4,
  perPage: 10,
};

describe('filterSlice reducers', () => {
  test('should return initial state when passed an empty action', () => {
    expect(filterReducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('should change filter params with "setFilterParams" action', () => {
    const filterParam = { startPage: 6 };
    const state = filterReducer(undefined, setFilterParams(filterParam));
    expect(state.filterParams.startPage).toBe(6);
  });

  test('should delete filtered products, quantity and reset nothingFound with "deleteFilteredData" action', () => {
    const mockState = {
      ...initialState,
      filteredProducts: [{ name: 'Cezar Salad', price: '22.49' }],
      productsQuantity: 1,
      nothingFound: true,
    };
    const state = filterReducer(mockState, deleteFilteredData());
    expect(state.filteredProducts).toEqual([]);
    expect(state.productsQuantity).toBe(null);
    expect(state.nothingFound).toBe(false);
  });

  test('should reset filter params to initial with "resetFilterParams" action', () => {
    const mockState = {
      ...initialState,
      ...filters,
    };
    const state = filterReducer(mockState, resetFilterParams());
    expect(state.filterParams).toEqual(initialState.filterParams);
  });
});

describe('filterSlice extraReducers', () => {
  test('should change status with "fetchFilteredProducts.pending" action', () => {
    const prevState = {
      ...initialState,
      loading: false,
      error: 'error',
    };
    const state = filterReducer(prevState, fetchFilteredProducts.pending());
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('should fetch filtered products "fetchFilteredProducts.fulfilled" action', () => {
    const prevState = {
      ...initialState,
      loading: true,
    };
    const mockProducts = {
      products: [{ name: 'Chicken Burger', price: '22.99' }, { name: 'Meat Pizza', price: '19.99' }],
      productsQuantity: 2,
    };

    const state = filterReducer(prevState, fetchFilteredProducts.fulfilled(mockProducts));
    expect(state.filteredProducts).toEqual(mockProducts.products);
    expect(state.productsQuantity).toBe(2);
    expect(state.nothingFound).toBe(false);
    expect(state.loading).toBe(false);
  });

  test('should fetch filtered products "fetchFilteredProducts.fulfilled" action with no products returned', () => {
    const prevState = {
      ...initialState,
      loading: true,
    };
    const mockProducts = {
      products: [],
      productsQuantity: 0,
    };

    const state = filterReducer(prevState, fetchFilteredProducts.fulfilled(mockProducts));
    expect(state.filteredProducts).toEqual([]);
    expect(state.productsQuantity).toBeNull();
    expect(state.nothingFound).toBe(true);
    expect(state.loading).toBe(false);
  });

  test('should change status with "fetchFilteredProducts.rejected" action', () => {
    const prevState = {
      ...initialState,
      loading: true,
      error: null,
    };
    const action = {
      type: fetchFilteredProducts.rejected.type,
      payload: 'Something went wrong',
    };
    const state = filterReducer(prevState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Something went wrong');
  });
});

jest.mock('../../API/instance');

describe('filterThunk', () => {
  test('should fetchFilteredProducts with resolved response', async () => {
    const mockProducts = {
      products: [{ name: 'Chicken Burger', price: '22.99' }, { name: 'Meat Pizza', price: '19.99' }],
      productsQuantity: 2,
    };
    const queryString = '?filterCategories=pizza&isHealthy=true&startPage=1&perPage=15';

    instance.get.mockResolvedValue({ data: mockProducts });

    const dispatch = jest.fn();
    const thunk = fetchFilteredProducts(queryString);

    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(3);
    const [start, middle, end] = calls;

    expect(start[0].type).toBe('filter/fetchFilteredProducts/pending');
    expect(middle[0].type).toBe('search/resetSearch');
    expect(end[0].type).toBe('filter/fetchFilteredProducts/fulfilled');
    expect(end[0].payload).toEqual(mockProducts);

    expect(instance.get).toHaveBeenCalledWith(`/products/filter${queryString}`);
  });

  test('should fetchFilteredProducts with rejected response', async () => {
    const queryString = '?filterCategories=pizza&isHealthy=true&startPage=1&perPage=15';
    instance.get.mockRejectedValue({ response: { data: { message: 'Something went wrong' } } });

    const dispatch = jest.fn();
    const thunk = fetchFilteredProducts(queryString);

    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;

    expect(start[0].type).toBe('filter/fetchFilteredProducts/pending');
    expect(end[0].type).toBe('filter/fetchFilteredProducts/rejected');
    expect(end[0].payload.message).toBe('Something went wrong');
    expect(end[0].meta.rejectedWithValue).toBe(true);

    expect(instance.get).toHaveBeenCalledWith(`/products/filter${queryString}`);
  });
});
