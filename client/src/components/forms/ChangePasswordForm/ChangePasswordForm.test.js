import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router';
import store from '../../../redux/store';
import ChangePasswordForm from './ChangePasswordForm';
import { instance } from '../../../API/instance';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: jest.fn(),
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

describe('Change password form component', () => {
  test('change password form snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <ChangePasswordForm />
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('try to submit empty form', async () => {
    render(
      <Provider store={store}>
        <ChangePasswordForm />
      </Provider>,
    );

    const submitButton = screen.getByText('Create Password');

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  test('Submit correct form', async () => {
    instance.post.mockResolvedValue({ status: 200 });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/change-password/user123/token123']}>
          <Routes>
            <Route path="/change-password/:userId/:token" element={<ChangePasswordForm />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const newPasswordInput = screen.getByPlaceholderText('Enter new password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm your password');
    const submitButton = screen.getByText('Create Password');

    fireEvent.change(newPasswordInput, { target: { value: '0123456789' } });
    fireEvent.change(confirmPasswordInput, { target: { value: '0123456789' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(instance.post).toHaveBeenCalledWith('/customers/reset-password', {
        id: 'user123',
        token: 'token123',
        password: '0123456789',
      });
    });
  });
});
