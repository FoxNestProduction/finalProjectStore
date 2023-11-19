/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-await-sync-query */
import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import VerifyEmailForm from './VerifyEmailForm';
import store from '../../../redux/store';
import { instance } from '../../../API/instance';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('../../../API/instance', () => ({
  instance: {
    post: jest.fn(),
  },
}));

const mockDispatch = jest.spyOn(require('react-redux'), 'useDispatch');

describe('VerifyEmailForm Component', () => {
  mockDispatch.mockReturnValueOnce(jest.fn());
  // Testing empty email input
  test('displays error messages correctly', async () => {
    render(
      <Provider store={store}>
        <VerifyEmailForm />
      </Provider>,
    );
    const button = screen.getByText('Continue');
    fireEvent.click(button);

    await screen.findByText('Email is required');

    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  // Testing wrong email
  test('displays error messages with wront email type', async () => {
    render(
      <Provider store={store}>
        <VerifyEmailForm />
      </Provider>,
    );
    const input = screen.getByPlaceholderText('Enter your e-mail');
    const button = screen.getByText('Continue');

    fireEvent.change(input, { target: { value: 'wrongEmail' } });
    fireEvent.click(button);

    await screen.findByText('Invalid email format');
    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
  });

  test('handles form submission', async () => {
    const dispatch = jest.fn();
    mockDispatch.mockReturnValueOnce(dispatch);
    instance.post.mockResolvedValueOnce({ status: 200 });
    render(
      <Provider store={store}>
        <VerifyEmailForm />
      </Provider>,
    );

    const emailInput = screen.getByPlaceholderText('Enter your e-mail');
    const button = screen.getByText('Continue');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(instance.post).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(instance.post).toHaveBeenCalledWith('/customers/forgot-password', {
        email: 'test@example.com',
      });
    });
    await waitFor(() => {
      expect(useDispatch).toHaveBeenCalledTimes(2);
    });
  });

  //   Snapshot
  test('renders VerifyEmailForm correctly', async () => {
    const { asFragment } = render(
      <Provider store={store}>
        <VerifyEmailForm />
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
