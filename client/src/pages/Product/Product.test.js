import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import ProductPage from './Product';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: jest.fn(),
  // useParams: () => ({
  //   hash: '123',
  // }),
}));
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn(),
}));

describe('ProductPage Component', () => {
  const dish = {
    // name: 'Product',
    // description: 'About Product',
    // itemNo: '123',
    // currentPrice: 10.99,
    // isTrending: true,
    // rating: 4,
    // imageUrl: 'image.jpg',
    // isSupreme: false,
    // isHealthy: true,
    _id: '123',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce([]);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(false);
    jest.spyOn(require('react-router'), 'useParams').mockReturnValueOnce({ itemNo: '123' });
  });

  test('should renders ProductPage component', () => {
    // const { asFragment } = render(
    //   <MemoryRouter initialEntries={['/products/:itemNo']}>
    //     <Routes>
    //       <Route path="/products/:itemNo" element={<ProductPage dish={dish} />} />
    //     </Routes>
    //   </MemoryRouter>
    // );

    // expect(asFragment()).toMatchSnapshot();
  });
});
