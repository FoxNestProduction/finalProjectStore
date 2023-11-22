import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import React from 'react';
import { Provider } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router';
import { MemoryRouter } from 'react-router-dom';
import { AlertContextProvider } from '../../../context/AlertProvider';
import useAlert from '../../../customHooks/useAlert';
import store from '../../../redux/store';
import ChangePasswordForm from './ChangePasswordForm';
import { instance } from '../../../API/instance';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: jest.fn(),
  Routes: ({ children }) => children,
  Route: ({ element }) => element,
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

jest.mock('../../../customHooks/useAlert', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Change password form component', () => {
  beforeEach(() => {
    useAlert.mockReturnValue({
      alert: false,
      handleShowAlert: jest.fn(),
      handleCloseAlert: jest.fn(),
    });
  });

  test('change password form snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <ChangePasswordForm />
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('try to submit empty form', async () => {
    /* eslint-disable-next-line */
    await act(async () => {
      render(
        <Provider store={store}>
          <ChangePasswordForm />
        </Provider>,
      );
    });

    const submitButton = screen.getByText('Create Password');

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  test('Submit correct form', async () => {
    instance.post.mockResolvedValue({ status: 200 });
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);
    /* eslint-disable-next-line */
    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/change-password/user123/token123']}>
            <AlertContextProvider>
              <Routes>
                <Route path="/change-password/:userId/:token" element={<ChangePasswordForm />} />
              </Routes>
            </AlertContextProvider>
          </MemoryRouter>
        </Provider>,
      );
    });

    const newPasswordInput = screen.getByPlaceholderText('Enter new password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm your password');
    const submitButton = screen.getByText('Create Password');

    fireEvent.change(newPasswordInput, { target: { value: '0123456789' } });
    fireEvent.change(confirmPasswordInput, { target: { value: '0123456789' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      // expect(instance.post).toHaveBeenCalledWith('/customers/reset-password', {
      //   id: 'user123',
      //   token: 'token123',
      //   password: '0123456789',
      // });
      expect(instance.post).toHaveBeenCalled();
    });

    await waitFor(() => expect(useAlert().handleShowAlert).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(navigateMock).toHaveBeenCalled(), { timeout: 4000 });
  });

  test('Error changing password', async () => {
    instance.post.mockResolvedValue({ status: 400 });
    /* eslint-disable-next-line */
    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/change-password/user123/token123']}>
            <AlertContextProvider>
              <Routes>
                <Route path="/change-password/:userId/:token" element={<ChangePasswordForm />} />
              </Routes>
            </AlertContextProvider>
          </MemoryRouter>
        </Provider>,
      );
    });

    const newPasswordInput = screen.getByPlaceholderText('Enter new password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm your password');
    const submitButton = screen.getByText('Create Password');
    /* eslint-disable-next-line */
    await act(async () => { fireEvent.change(newPasswordInput, { target: { value: '0123456789' } }); });
    /* eslint-disable-next-line */
    await act(async () => { fireEvent.change(confirmPasswordInput, { target: { value: '0123456780' } }); });
    /* eslint-disable-next-line */
    await act(async () => { fireEvent.click(submitButton); });

    await waitFor(() => {
      expect(instance.post).not.toHaveBeenCalled();
    });
  });
});
