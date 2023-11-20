import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
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
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(true);
  });

  test('should renders ProductPage component', () => {
    useMediaQuery.mockReturnValue(true);

    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/products/:123']}>
          <Routes>
            <Route path="/products/:itemNo" element={<ProductPage dish={dish} />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('should renders ProductPage component isLgTablet', () => {
    useMediaQuery.mockReturnValue(false);

    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/products/:123']}>
          <Routes>
            <Route path="/products/:itemNo" element={<ProductPage dish={dish} />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
