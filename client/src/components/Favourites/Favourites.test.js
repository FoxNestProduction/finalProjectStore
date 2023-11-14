import React from 'react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import { Provider } from 'react-redux';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { useMediaQuery, Box } from '@mui/material';
import store from '../../redux/store';
import Favourites from './Favourites';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useRoutes: jest.requireActual('react-router-dom').useRoutes,
  useNavigate: () => mockNavigate,
}));
jest.mock('@mui/material/', () => ({
  ...jest.requireActual('@mui/material/'),
  useMediaQuery: jest.fn(),
}));

describe('Snapshot test', () => {
  test('should Favourites render, when arr not empty', () => {
    useMediaQuery.mockReturnValue(true);

    const favouritesList = [
      { _id: '1', name: 'pasta', currentPrice: 10.99, imageUrl: 'image1.jpg' },
      { _id: '2', name: 'pizza', currentPrice: 15.99, imageUrl: 'image2.jpg' },
    ];

    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValue(favouritesList);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favourites />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText('Favourite')).toBeInTheDocument();
  });

  test('should Favourites render, when arr is empty', () => {
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce([]);

    const { asFragment } = render(
      <MemoryRouter initialEntries={['/favourites']}>
        <Routes>
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should navigate to /menu on button click', async () => {
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce([]);
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValueOnce(mockNavigate);

    render(
      <MemoryRouter initialEntries={['/favourites']}>
        <Routes>
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </MemoryRouter>,
    );
    const button = screen.getByText('Back to menu');

    fireEvent.click(button);
    // await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/menu'));
  });

  test('should render FavouriteItem', () => {
    const favouritesList = [
      { _id: '1', name: 'pasta', currentPrice: 10.99, imageUrl: 'image1.jpg' },
      { _id: '2', name: 'pizza', currentPrice: 15.99, imageUrl: 'image2.jpg' },
    ];

    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(favouritesList);
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValueOnce(mockNavigate);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favourites />
        </MemoryRouter>
      </Provider>,
    );

    favouritesList.forEach((item) => {
      const itemName = screen.getByText(item.name);
      const itemPrice = screen.getByText(`$${item.currentPrice.toFixed(2)}`);

      expect(itemName).toBeInTheDocument();
      expect(itemPrice).toBeInTheDocument();
    });
  });
});
