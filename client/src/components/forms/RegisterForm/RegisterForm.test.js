/* eslint-disable testing-library/no-await-sync-query */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import RegisterForm from './RegisterForm';
import store from '../../../redux/store';
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

describe('Register form component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Register form snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <RegisterForm />
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('Change to Login form', async () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <RegisterForm />
      </Provider>,
    );

    const logInBtn = screen.getByText('Log In');
    fireEvent.click(logInBtn);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });

  test('try to submit empty form', async () => {
    render(
      <Provider store={store}>
        <RegisterForm />
      </Provider>,
    );
    const firstNameInput = screen.getByPlaceholderText('Enter your first name');
    const lastNameInput = screen.getByPlaceholderText('Enter your last name');
    const emailInput = screen.getByPlaceholderText('Enter your e-mail');
    const passwordInput = screen.getByPlaceholderText('Сome up with a password');
    const submitButton = screen.getByText('Sign up');
    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Enter your first name')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Enter your last name')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  test('Submit correct form', async () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    render(
      <Provider store={store}>
        <RegisterForm />
      </Provider>,
    );

    const firstNameInput = screen.getByPlaceholderText('Enter your first name');
    const lastNameInput = screen.getByPlaceholderText('Enter your last name');
    const emailInput = screen.getByPlaceholderText('Enter your e-mail');
    const passwordInput = screen.getByPlaceholderText('Сome up with a password');
    const submitButton = screen.getByText('Sign up');

    fireEvent.change(firstNameInput, { target: { value: 'Yurii' } });
    fireEvent.change(lastNameInput, { target: { value: 'Horodnii' } });
    fireEvent.change(emailInput, { target: { value: 'example@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password12#' } });

    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      const newUser = {
        firstName: 'Yurii',
        lastName: 'Horodnii',
        email: 'example@example.com',
        password: 'Password12#',
        login: 'YuriiHorodnii',
        isAdmin: false,
      };
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
