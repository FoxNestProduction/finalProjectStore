import filterReducer, { setFilterParams,
  deleteFilteredData,
  resetFilterParams } from '../slices/filterSlice';

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

describe('filterSlice', () => {
  test('should return initial state when passed an empty action', () => {
    expect(filterReducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('should change filter params with "setFilterParams" action', () => {
    const filterParam = { startPage: 6 };
    const result = filterReducer(undefined, setFilterParams(filterParam));
    expect(result.filterParams.startPage).toBe(6);
  });

  test('should delete filtered products, quantity and reset nothingFound with "deleteFilteredData" action', () => {
    const mockState = {
      ...initialState,
      filteredProducts: [{ name: 'Cezar Salad', price: '22.49' }],
      productsQuantity: 1,
      nothingFound: true,
    };
    const result = filterReducer(mockState, deleteFilteredData());
    expect(result.filteredProducts).toEqual([]);
    expect(result.productsQuantity).toBe(null);
    expect(result.nothingFound).toBe(false);
  });

  test('should reset filter params to initial with "resetFilterParams" action', () => {
    const mockState = {
      ...initialState,
      ...filters,
    };
    const result = filterReducer(mockState, resetFilterParams());
    expect(result.filterParams).toEqual(initialState.filterParams);
  });
});
