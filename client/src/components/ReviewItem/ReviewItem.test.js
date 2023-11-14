import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation, useNavigate } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import ReviewItem from './ReviewItem';

const mockStore = configureStore();

describe('ReviewItem component', () => {
  const review = {
    _id: '1',
    rating: 4,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    date: '2023-11-09T12:00:00Z',
    customer: {
      lastName: 'Doe',
      firstName: 'John',
    },
  };
  const store = mockStore();

  test('should render ReviewItem', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ReviewItem review={review} index={0} />
        </MemoryRouter>
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('should render ReviewItem with correct data', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ReviewItem review={review} index={0} />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Doe John')).toBeInTheDocument();
    expect(screen.getByText('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')).toBeInTheDocument();
    expect(screen.getByText('09.11.2023')).toBeInTheDocument();
  });
});
