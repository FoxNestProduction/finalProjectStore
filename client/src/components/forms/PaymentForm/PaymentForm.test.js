import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import PaymentForm from './PaymentForm';
import store from '../../../redux/store';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: jest.fn(),
}));

describe('Payment form component', () => {
  test('Payment form snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <PaymentForm />
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('displays payment form correctly', () => {
    render(
      <Provider store={store}>
        <PaymentForm />
      </Provider>,
    );

    expect(screen.getByText('Add new card')).toBeInTheDocument();
    expect(screen.getByLabelText('Cardholder name*')).toBeInTheDocument();
    expect(screen.getByLabelText('Card number*')).toBeInTheDocument();
    expect(screen.getByLabelText('Expiry date')).toBeInTheDocument();
    expect(screen.getByLabelText('CVV')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByText('Continue')).toBeInTheDocument();
  });
});
