import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import store from '../../../redux/store';
import CheckoutForm from './CheckoutForm';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('Checkout form component', () => {
  test('checkout form snapshot', () => {
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);
    const { asFragment } = render(
      <Provider store={store}>
        <CheckoutForm />
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('try to submit empty form', async () => {
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);
    render(
      <Provider store={store}>
        <CheckoutForm />
      </Provider>,
    );

    const submitButton = screen.getByText('Continue');

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Phone number is required')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Enter the name of your street')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Enter the number of your house')).toBeInTheDocument();
    });
  });

  test('Submit correct form', async () => {
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <CheckoutForm />
      </Provider>,
    );

    const nameInput = screen.getByLabelText('Name*');
    const emailInput = screen.getByLabelText('Email Address*');
    const phoneNumberInput = screen.getByLabelText('Phone Number*');
    const streetInput = screen.getByLabelText('Street*');
    const houseInput = screen.getByLabelText('House*');
    const apartmentInput = screen.getByLabelText('Apartment');
    const submitButton = screen.getByText('Continue');

    fireEvent.change(nameInput, { target: { value: 'Yurii' } });
    fireEvent.change(emailInput, { target: { value: 'example@example.com' } });
    fireEvent.change(phoneNumberInput, { target: { value: '+38 (011) 111-11-11' } });
    fireEvent.change(streetInput, { target: { value: 'Example Street' } });
    fireEvent.change(houseInput, { target: { value: '111' } });
    fireEvent.change(apartmentInput, { target: { value: '22' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
