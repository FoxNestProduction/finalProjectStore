import React from 'react';
// import { MemoryRouter, Route, Routes, useLocation, useNavigate  } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import { Provider } from 'react-redux';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { useMediaQuery } from '@mui/material';
import store from '../../redux/store';
import Favourites from './Favourites';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: jest.fn(() => ({ pathname: '/favourites' })),
  useNavigate: jest.fn(),
  Routes: ({ children }) => children,
  Route: ({ element }) => element,
}));;
jest.mock('@mui/material/', () => ({
  ...jest.requireActual('@mui/material/'),
  useMediaQuery: jest.fn(),
}));

describe('Snapshot test', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should Favourites render, when arr is empty', () => {
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce([]);

    const { asFragment } = render(
      <MemoryRouter initialEntries={['/favourites']}>
        <Routes>
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.queryByRole('list')).toBeNull();

    const button = screen.getByText('Back to menu');

    fireEvent.click(button);
    expect(navigateMock).toHaveBeenCalledWith('/menu');
  });

  test('should render FavouriteItem', () => {
    const favouritesList = [
      { _id: '1', name: 'pasta', currentPrice: 10.99, imageUrl: 'image1.jpg' },
      { _id: '2', name: 'pizza', currentPrice: 15.99, imageUrl: 'image2.jpg' },
    ];

    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(favouritesList);

    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Favourites />
        </MemoryRouter>
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();

    favouritesList.forEach((item) => {
      const itemName = screen.getByText(item.name);
      const itemPrice = screen.getByText(`$${item.currentPrice.toFixed(2)}`);

      expect(itemName).toBeInTheDocument();
      expect(itemPrice).toBeInTheDocument();
    });
  });
});
