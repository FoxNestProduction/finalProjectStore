import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import ContactForm from './ContactForm';
import { instance } from '../../../API/instance';

jest.mock('../../../API/instance', () => ({
  instance: {
    post: jest.fn(),
  },
}));

describe('Contact form component', () => {
  test('contact form snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <ContactForm />
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('try to submit empty form', async () => {
    render(
      <Provider store={store}>
        <ContactForm />
      </Provider>,
    );

    const submitButton = screen.getByText('Send Now');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  test('Submit correct form', async () => {
    render(
      <Provider store={store}>
        <ContactForm />
      </Provider>,
    );

    const nameInput = screen.getByPlaceholderText('Enter your name');
    const emailInput = screen.getByPlaceholderText('Enter your e-mail');
    const textarea = screen.getByPlaceholderText('Enter the problem or query...');
    const submitButton = screen.getByText('Send Now');

    fireEvent.change(nameInput, { target: { value: 'Yurii' } });
    fireEvent.change(emailInput, { target: { value: 'example@example.com' } });
    fireEvent.change(textarea, { target: { value: 'Some message' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(instance.post).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      const value = {
        name: 'Yurii',
        email: 'example@example.com',
        message: 'Some message',
      };
      expect(instance.post).toHaveBeenCalledWith('/support', value);
    });
  });
});
