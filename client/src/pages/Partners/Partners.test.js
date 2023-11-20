import React, { Component } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import PartnersPage from './Partners';
import PartnersCard from '../../components/PartnersCard/PartnersCard';
import useGetAPI from '../../customHooks/useGetAPI';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

jest.mock('../../customHooks/useGetAPI', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@mui/material/', () => ({
  ...jest.requireActual('@mui/material/'),
  useMediaQuery: jest.fn(),
}));

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => ({ name: 'PizzaDay', customId: '321' }),
}));
const partner = {
  rating: 5,
  name: 'PizzaDay',
  imageUrl: 'image1.jpg',
  description: 'PizzaDayAbout',
  customId: '321',
};

describe('PartnersPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should renders PartnersPage component', async () => {
    useGetAPI.mockReturnValueOnce([{
      rating: 5,
      name: 'PizzaDay',
      imageUrl: 'image1.jpg',
      description: 'PizzaDayAbout',
      customId: '321',
    }, false, null]);
    useGetAPI.mockReturnValueOnce([null, true, null]);

    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/partners/:321']}>
          <Routes>
            <Route
              path="/restaurants/:name/:customId"
              element={(
                <PartnersPage>
                  <PartnersCard partner={partner} />
                </PartnersPage>
            )}
            />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });

  test('should render skeleton while loading partner', () => {
    useGetAPI.mockReturnValueOnce([null, true, null]);
    useGetAPI.mockReturnValueOnce([null, true, null]);

    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/restaurants/:321']}>
          <Routes>
            <Route path="/restaurants/:customId" element={<PartnersPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
