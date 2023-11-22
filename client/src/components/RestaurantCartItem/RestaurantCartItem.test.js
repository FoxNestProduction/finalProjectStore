import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import RestaurantCartItem from './RestaurantCartItem';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('RestaurantCartItem Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should renders RestaurantCartItem component', () => {
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce([]);

    const { asFragment } = render(
      <MemoryRouter>
        <RestaurantCartItem restaurantName="Pesto" />
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
