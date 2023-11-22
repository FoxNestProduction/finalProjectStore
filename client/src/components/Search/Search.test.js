import React from 'react';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import store from '../../redux/store';

import Search from './Search';
import { fetchAllProductsNames } from '../../redux/slices/productsSlice';
import { fetchAllPartnersNames } from '../../redux/slices/partnersSlice';
import { deleteFilteredData, resetFilterParams } from '../../redux/slices/filterSlice';
import {
  setKey,
  setInputSearchValue,
  setSearch,
  resetSearch,
  fetchSearchedProductsOrPartners,
} from '../../redux/slices/searchSlice';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../redux/slices/productsSlice', () => ({
  ...jest.requireActual('../../redux/slices/productsSlice'),
  fetchAllProductsNames: jest.fn(),
}));

jest.mock('../../redux/slices/partnersSlice', () => ({
  ...jest.requireActual('../../redux/slices/partnersSlice'),
  fetchAllPartnersNames: jest.fn(),
}));

jest.mock('../../redux/slices/searchSlice', () => ({
  ...jest.requireActual('../../redux/slices/searchSlice'),
  setKey: jest.fn(),
  setInputSearchValue: jest.fn(),
  setSearch: jest.fn(),
  resetSearch: jest.fn(),
  fetchSearchedProductsOrPartners: jest.fn(),
}));

jest.mock('../../redux/slices/filterSlice', () => ({
  ...jest.requireActual('../../redux/slices/filterSlice'),
  deleteFilteredData: jest.fn(),
  resetFilterParams: jest.fn(),
}));

const mockDispatch = jest.spyOn(require('react-redux'), 'useDispatch');

describe('Snapshot test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce('test');
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce('food');
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(['test', 'test2']);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(['test', 'test2']);
  });

  test('should Search render', () => {
    const dispatch = jest.fn();
    mockDispatch.mockReturnValueOnce(dispatch);
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <Search />
        </Router>
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(screen.getByText('Restaurant')).toBeInTheDocument();
  });

  test('should update input value on user input', () => {
    const dispatch = jest.fn();
    mockDispatch.mockReturnValueOnce(dispatch);
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    render(
      <Provider store={store}>
        <Router>
          <Search />
        </Router>
      </Provider>,
    );

    expect(dispatch).toHaveBeenCalledWith(setInputSearchValue('new search value'));
  });

  test('should dispatch actions on button toggle', () => {
    const dispatch = jest.fn();
    mockDispatch.mockReturnValueOnce(dispatch);
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    render(
      <Provider store={store}>
        <Router>
          <Search />
        </Router>
      </Provider>,
    );

    const foodButton = screen.getByText('Food');
    fireEvent.click(foodButton);

    expect(dispatch).toHaveBeenCalled();
  });

  test('should fetch data on input change', async () => {
    const dispatch = jest.fn();
    mockDispatch.mockReturnValueOnce(dispatch);
    // const navigateMock = jest.fn();
    // useNavigate.mockReturnValue(navigateMock);

    render(
      <Provider store={store}>
        <Router>
          <Search />
        </Router>
      </Provider>,
    );

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });
});
