/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-await-sync-query */
import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import { render, fireEvent, screen } from '@testing-library/react';
import VerifyEmailForm from './VerifyEmailForm';
import store from '../../../redux/store';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('VerifyEmailForm Component', () => {
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

  //   Snapshot
  test('renders VerifyEmailForm correctly', async () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    const { asFragment } = render(
      <Provider store={store}>
        <VerifyEmailForm />
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
