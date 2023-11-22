import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import store from '../../../redux/store';
import LoginForm from './LoginForm';
import { instance } from '../../../API/instance';

jest.mock('../../../redux/slices/modalSlice', () => ({
  ...jest.requireActual('../../../redux/slices/modalSlice'),
  setContent: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('../../../API/instance', () => ({
  instance: {
    post: jest.fn(),
  },
}));

global.google = {
  accounts: {
    oauth2: {
      initCodeClient: jest.fn(),
    },
  },
};

describe('Login form component', () => {
  test('Login form snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <LoginForm />
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('Change to Login form', async () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>,
    );

    const logInBtn = screen.getByText('Sing Up');
    fireEvent.click(logInBtn);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });

  test('try to submit empty form', async () => {
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>,
    );
    const emailInput = screen.getByPlaceholderText('Enter your e-mail');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const submitButton = screen.getByText('Sign in');
    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Enter your e-mail')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });
  });

  test('Submit correct form', async () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>,
    );

    const emailInput = screen.getByPlaceholderText('Enter your e-mail');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const submitButton = screen.getByText('Sign in');

    fireEvent.change(emailInput, { target: { value: 'example@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });

  test('forget password button', async () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>,
    );

    const forgetPassBtn = screen.getByText('Forget Password ?');

    fireEvent.click(forgetPassBtn);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
