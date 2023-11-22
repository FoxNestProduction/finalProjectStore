import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import RestaurantPage from './Restaurant';
import useGetAPI from '../../customHooks/useGetAPI';
import useTopProducts from '../../customHooks/useTopProducts';

jest.mock('../../customHooks/useTopProducts', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

jest.mock('../../customHooks/useGetAPI', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => ({ name: 'PzzaDay', customId: '321' }),
}));

describe('RestaurantPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useTopProducts.mockImplementationOnce(() => []);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(true);
  });

  test('should renders ProductPage component', () => {
    useGetAPI.mockImplementationOnce(() => ([
      [
        {
          rating: 5,
          name: 'PzzaDay',
          imageUrl: 'image1.jpg',
          description: 'PzzaDayAbout',
          customId: '321',
        },
      ],
      false,
      null,
    ]));

    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/restaurants/:PzzaDay/:321']}>
          <Routes>
            <Route path="/restaurants/:name/:customId" element={<RestaurantPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const skeletons = screen.getByRole('listbox');
    expect(skeletons).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test('should renders ProductPage component isLoading', () => {
    useGetAPI.mockImplementationOnce(() => ([
      [
        {
          rating: 5,
          name: 'PzzaDay',
          imageUrl: 'image1.jpg',
          description: 'PzzaDayAbout',
          customId: '321',
        },
      ],
      true,
      null,
    ]));

    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/restaurants/:PzzaDay/:321']}>
          <Routes>
            <Route path="/restaurants/:name/:customId" element={<RestaurantPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
