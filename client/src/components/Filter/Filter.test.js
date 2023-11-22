import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import Filter from './Filter';
import { setFilterParams } from '../../redux/slices/filterSlice';
import { resetSearch } from '../../redux/slices/searchSlice';
import store from '../../redux/store';

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

const mockDispatch = jest.spyOn(require('react-redux'), 'useDispatch');

describe('Filter component', () => {
  const filters = {
    filterCategories: ['pizza', 'burgers', 'sushi', 'salads'],
    isTrending: false,
    rating: null,
    isHealthy: false,
    isSupreme: false,
    minPrice: 0,
    maxPrice: 30,
  };

  test('renders Filter component', () => {
    const { asFragment } = render(
      <Filter filters={filters} setFilters={() => {}} resetFiltersLocalState={() => {}} />,
    );

    expect(asFragment()).toMatchSnapshot();

    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Filter By')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Apply')).toBeInTheDocument();
  });

  test('handles category toggle buttons correctly', () => {
    render(<Filter filters={filters} setFilters={() => {}} resetFiltersLocalState={() => {}} />);
    const optionPizza = screen.getByText('Pizza');
    fireEvent.click(optionPizza);

    const optionBurgers = screen.getByText('Burgers');
    fireEvent.click(optionBurgers);

    const optionSushi = screen.getByText('Sushi');
    fireEvent.click(optionSushi);

    const optionSalads = screen.getByText('Salads');
    fireEvent.click(optionSalads);
    // eslint-disable-next-line testing-library/no-node-access
    expect(optionPizza.closest('button')).toHaveClass('Mui-selected');
    // eslint-disable-next-line testing-library/no-node-access
    expect(optionBurgers.closest('button')).toHaveClass('Mui-selected');
    // eslint-disable-next-line testing-library/no-node-access
    expect(optionSushi.closest('button')).toHaveClass('Mui-selected');
    // eslint-disable-next-line testing-library/no-node-access
    expect(optionSalads.closest('button')).toHaveClass('Mui-selected');
  });

  test('handles "Apply Filter" button click correctly', async () => {
    const dispatch = jest.fn();
    mockDispatch.mockReturnValueOnce(dispatch);
    render(
      <Provider store={store}>
        <Filter filters={filters} setFilters={() => {}} resetFiltersLocalState={() => {}} />
      </Provider>,
    );

    fireEvent.click(screen.getByText('Apply'));

    expect(dispatch).toHaveBeenCalledTimes(3);

    await waitFor(() => {
      expect(setFilterParams).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(resetSearch).toHaveBeenCalled();
    });
  });
});
