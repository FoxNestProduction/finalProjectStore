import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import CheckoutPage from './Checkout';
import CheckoutForm from '../../components/forms/CheckoutForm/CheckoutForm';

describe('CheckoutPage', () => {
  test('should render CheckoutPage', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CheckoutPage titleText="Checkout" formComponent={CheckoutForm} />
        </MemoryRouter>
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();

    const title = screen.getByText('Checkout');

    expect(title).toBeInTheDocument();
  });
});
