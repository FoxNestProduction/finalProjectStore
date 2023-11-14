import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewReview from './NewReview';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('Snapshot test', () => {
  const useSelectorMock = jest.fn();
  const useDispatchMock = jest.fn();

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });

  test('should NewReview render', () => {
    useSelectorMock.mockReturnValueOnce(5);
    const { asFragment } = render(<NewReview />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should update state on text change', async () => {
    useSelectorMock.mockReturnValueOnce(5);
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    const { getByLabelText } = render(<NewReview />);

    const textField = getByLabelText('leave your feedback about the service');
    userEvent.type(textField, 'This is a new review text');

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'reviews/setNewReview',
          payload: {
            field: 'content',
            value: 'This is a new review text',
          },
        }),
      );
    });
  });

  test('should update state on rating change', async () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    const { getByText, getByLabelText } = render(<NewReview />);

    const textField = getByLabelText('leave your feedback about the service');
    userEvent.type(textField, 'This is a new review text');

    const ratingLabel = screen.getByText('1 Star');
    const ratingInput = ratingLabel.closest('label');
    const inputElement = ratingInput.nextElementSibling;
    const valueRating = inputElement.value;

    userEvent.click(inputElement);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'reviews/setNewReview',
        payload: {
          field: 'rating',
          value: expect.any(Number),
        },
      });
    });
  });
});
