import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
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

  test('displays register form correctly', async () => {
    render(
      <Provider store={store}>
        <PaymentForm />
      </Provider>,
    );
    const cardholderName = screen.getByPlaceholderText('Cardholder name');
    const cardNumber = screen.getByPlaceholderText('Card number');
    const expiryDate = screen.getByPlaceholderText('Expiry date');
    const CVV = screen.getByPlaceholderText('CVV');
    const submitButton = screen.getByText('Sign up');

    fireEvent.click(submitButton);

    await screen.findByText('Enter your first name');
    await screen.findByText('Enter your last name');
    await screen.findByText('Email is required');
    await screen.findByText('Password is required');

    expect(screen.getByText('Enter your first name')).toBeInTheDocument();
    expect(screen.getByText('Enter your last name')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });
});
