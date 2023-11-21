import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import store from '../../../redux/store';
import CreatePasswordForm from './CreatePasswordForm';
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

describe('Create password form component', () => {
  test('Create password form snapshot', () => {

    const { asFragment } = render(
      <Provider store={store}>
        <CreatePasswordForm />
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('try to submit empty form', async () => {
    mockDispatch.mockReturnValueOnce(jest.fn());
       instance.post.mockRejectedValue({ response: { data: { message: 'Password is required' } } });
        render(
          <Provider store={store}>
            <CreatePasswordForm />
          </Provider>,
        );

    const submitButton = screen.getByText('Sign up');

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  test('Submit correct form', async () => {
    instance.post.mockResolvedValue({ status: 200 });

    render(
      <Provider store={store}>
        <CreatePasswordForm />
      </Provider>,
    );

    const passwordInput = screen.getByPlaceholderText('Сome up with a password');
    const submitButton = screen.getByText('Sign up');

    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(instance.post).toHaveBeenCalledWith('/customers', expect.objectContaining({
        password: 'password123',
      }));
    });
  });
});
