import searchReducer, { setSearch, setKey, setInputSearchValue, resetSearch } from '../slices/searchSlice';

const initialState = {
  search: [],
  key: 'food',
  inputSearchValue: '',
};

describe('searchSlice', () => {
  test('should return initial state when passed an empty action', () => {
    expect(searchReducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('should add searched products with "setSearch" action', () => {
    const searchedProducts = [{ name: 'Cezar Salad', price: '22.49' }];
    const result = searchReducer(initialState, setSearch(searchedProducts));
    expect(result.search).toEqual(searchedProducts);
  });

  test('should reset products with "setSearch" action', () => {
    const mockState = {
      search: [{ name: 'Cezar Salad', price: '22.49' }],
      key: 'food',
      inputSearchValue: '',
    };
    const result = searchReducer(mockState, setSearch([]));
    expect(result.search).toEqual([]);
  });

  test('should set key with "setKey" action', () => {
    const result = searchReducer(undefined, setKey('restaurants'));
    expect(result.key).toBe('restaurants');
  });

  test('should set input search value with "setInputSearchValue" action', () => {
    const result = searchReducer(undefined, setInputSearchValue('pizza'));
    expect(result.inputSearchValue).toBe('pizza');
  });

  test('should reset search state to initial with "resetSearch" action', () => {
    const mockState = {
      search: [{ name: 'Cezar Salad', price: '22.49' }],
      key: 'food',
      inputSearchValue: 'pizza',
    };
    const result = searchReducer(mockState, resetSearch());
    expect(result).toEqual(initialState);
  });
});
