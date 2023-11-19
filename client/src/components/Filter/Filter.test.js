import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Filter from './Filter';
import { setFilterParams } from '../../redux/slices/filterSlice';
import { setIsApplyClicked } from '../../redux/slices/scrollAnchorSlice';
import { resetSearch } from '../../redux/slices/searchSlice';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureStore();
const store = mockStore({
  filteredProducts: [],
  productsQuantity: null,
  loading: false,
  error: null,
  nothingFound: false,
  filterParams: {
    filterCategories: [],
    isTrending: false,
    rating: null, // mostPopular
    isHealthy: false,
    isSupreme: false,
    minPrice: 0,
    maxPrice: 30,
    sort: '',
    startPage: 1,
    perPage: 10,
  },
});

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../redux/slices/filterSlice', () => ({
  ...jest.requireActual('../../redux/slices/filterSlice'),
  setFilteredProducts: jest.fn(),
  setProductsQuantity: jest.fn(),
  setFilterParams: jest.fn(),
  setIsApplyClicked: jest.fn(),
  deleteFilteredData: jest.fn(),
  resetFilterParams: jest.fn(),
}));

jest.mock('../../redux/slices/searchSlice', () => ({
  ...jest.requireActual('../../redux/slices/searchSlice'),
  resetSearch: jest.fn(),
}));

describe('Filter component', () => {
  const filters = {
    filterCategories: ['pizza', 'burgers'],
    isTrending: false,
    rating: null,
    isHealthy: false,
    isSupreme: false,
    minPrice: 0,
    maxPrice: 30,
  };

  test('renders Filter component', () => {
    render(<Filter filters={filters} setFilters={() => {}} resetFiltersLocalState={() => {}} />);
    // Add assertions based on your component's expected initial state
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Filter By')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Apply')).toBeInTheDocument();
  });
  // });
  test('handles category toggle buttons correctly', () => {
    render(<Filter filters={filters} setFilters={() => {}} resetFiltersLocalState={() => {}} />);
    userEvent.click(screen.getByText('Pizza'));
    userEvent.click(screen.getByText('Burgers'));

    expect(screen.getByText('Pizza').closest('button')).toHaveClass('Mui-selected');
    expect(screen.getByText('Burgers').closest('button')).toHaveClass('Mui-selected');
  });

  // test('handles "Apply Filter" button click correctly', async () => {
  //   render(
  //     <Provider store={store}>
  //       <Filter filters={filters} setFilters={() => {}} resetFiltersLocalState={() => {}} />
  //     </Provider>
  //   );
  //   fireEvent.click(screen.getByText('Apply'));
  //   await waitFor(() => {
  //     expect(setFilterParams).toHaveBeenCalledWith({
  //       filterCategories: ['pizza', 'burgers'],
  //       isHealthy: false,
  //       isSupreme: false,
  //       isTrending: false,
  //       maxPrice: 30,
  //       minPrice: 0,
  //       rating: null,
  //       startPage: 1,
  //     });
  //     expect(setIsApplyClicked).toHaveBeenCalledWith(true);
  //     expect(resetSearch).toHaveBeenCalled();
  //   });
  // });
});
