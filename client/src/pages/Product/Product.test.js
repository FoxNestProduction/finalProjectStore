import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import store from '../../redux/store';
import ProductPage from './Product';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => ({ itemNo: '123' }),
}));
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn(),
}));

describe('ProductPage Component', () => {
  const dish = {
    name: 'Product',
    description: 'About Product',
    itemNo: '123',
    currentPrice: 10.99,
    isTrending: true,
    rating: 4,
    imageUrl: 'image.jpg',
    isSupreme: false,
    isHealthy: true,
    randomNum: 25,
    _id: '123',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce([]);
  });

  test('should renders ProductPage component', async () => {
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(false);
    useMediaQuery.mockReturnValue(true);
    /* eslint-disable-next-line */
    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/products/:123']}>
            <Routes>
              <Route path="/products/:itemNo" element={<ProductPage dish={dish} />} />
            </Routes>
          </MemoryRouter>
        </Provider>,
      );
    });

    await waitFor(() => expect(screen.getAllByTestId('StarBorderIcon')).toHaveLength(5));
  });

  test('should renders ProductPage component isLgTablet', async () => {
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(false);
    useMediaQuery.mockReturnValue(false);
    /* eslint-disable-next-line */
    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/products/:123']}>
            <Routes>
              <Route path="/products/:itemNo" element={<ProductPage dish={dish} />} />
            </Routes>
          </MemoryRouter>
        </Provider>,
      );
    });

    await waitFor(() => expect(screen.getAllByTestId('StarBorderIcon')).toHaveLength(5));
  });
});
