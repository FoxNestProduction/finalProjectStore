import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import OrderConfirmationPage from './OrderConfirmation';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: jest.fn(() => ({ pathname: '/order-confirmation' })),
  useNavigate: jest.fn(),
}));

describe('OrderConfirmationPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render OrderConfirmationPage', () => {
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <OrderConfirmationPage />
        </MemoryRouter>
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();

    const button = screen.getByText('Back Home');
    fireEvent.click(button);
    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});
