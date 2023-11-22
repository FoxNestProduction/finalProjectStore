import searchReducer, { setSearch, setKey, setInputSearchValue, resetSearch, fetchSearchedProductsOrPartners } from '../slices/searchSlice';
import { instance } from '../../API/instance';

const initialState = {
  search: [],
  loading: false,
  error: null,
  key: 'food',
  inputSearchValue: '',
};

describe('searchSlice reducers', () => {
  test('should return initial state when passed an empty action', () => {
    expect(searchReducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('should add searched products with "setSearch" action', () => {
    const searchedProducts = [{ name: 'Cezar Salad', price: '22.49' }];
    const state = searchReducer(initialState, setSearch(searchedProducts));
    expect(state.search).toEqual(searchedProducts);
  });

  test('should reset products with "setSearch" action', () => {
    const mockState = {
      search: [{ name: 'Cezar Salad', price: '22.49' }],
      key: 'food',
      inputSearchValue: '',
    };
    const state = searchReducer(mockState, setSearch([]));
    expect(state.search).toEqual([]);
  });

  test('should set key with "setKey" action', () => {
    const state = searchReducer(undefined, setKey('restaurants'));
    expect(state.key).toBe('restaurants');
  });

  test('should set input search value with "setInputSearchValue" action', () => {
    const state = searchReducer(undefined, setInputSearchValue('pizza'));
    expect(state.inputSearchValue).toBe('pizza');
  });

  test('should reset search state to initial with "resetSearch" action', () => {
    const mockState = {
      search: [{ name: 'Cezar Salad', price: '22.49' }],
      loading: false,
      error: null,
      key: 'food',
      inputSearchValue: 'pizza',
    };
    const state = searchReducer(mockState, resetSearch());
    expect(state).toEqual(initialState);
  });
});

describe('searchSlice extraReducers', () => {
  test('should fetch searched products or partners with "fetchSearchedProductsOrPartners.fulfilled" action', () => {
    const mockProducts = [{ name: 'Chicken Burger', price: '22.99' }, { name: 'Meat Pizza', price: '19.99' }];

    const state = searchReducer(
      initialState,
      fetchSearchedProductsOrPartners.fulfilled(mockProducts),
    );
    expect(state.search).toEqual(mockProducts);
  });
});

jest.mock('../../API/instance');

describe('searchThunk', () => {
  test('should fetchSearchedProductsOrPartners with resolved response', async () => {
    const mockProducts = [{ name: 'Chicken Burger', price: '22.99' }, { name: 'Meat Pizza', price: '19.99' }];
    const fetchData = {
      url: '/products/search',
      body: {
        query: 'pizza',
      },
    };

    instance.post.mockResolvedValue({ data: mockProducts });

    const dispatch = jest.fn();
    const thunk = fetchSearchedProductsOrPartners(fetchData);
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe('search/fetchSearchedProductsOrPartners/pending');
    expect(end[0].type).toBe('search/fetchSearchedProductsOrPartners/fulfilled');
    // expect(start[0].type).toBe(fetchSearchedProductsOrPartners.pending().type);
    // expect(end[0].type).toBe(fetchSearchedProductsOrPartners.fulfilled().type);
    expect(end[0].payload).toEqual(mockProducts);

    expect(instance.post).toHaveBeenCalledWith('/products/search', { query: 'pizza' });
  });

  test('should fetchSearchedProductsOrPartners with rejected response', async () => {
    const fetchData = {
      url: '/products/search',
      body: {
        query: 'pizza',
      },
    };

    instance.post.mockRejectedValue({ response: { data: { message: 'Something went wrong' } } });

    const dispatch = jest.fn();
    const thunk = fetchSearchedProductsOrPartners(fetchData);
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe('search/fetchSearchedProductsOrPartners/pending');
    expect(end[0].type).toBe('search/fetchSearchedProductsOrPartners/rejected');
    expect(end[0].payload.message).toBe('Something went wrong');
    expect(end[0].meta.rejectedWithValue).toBe(true);

    expect(instance.post).toHaveBeenCalledWith('/products/search', { query: 'pizza' });
  });
});
