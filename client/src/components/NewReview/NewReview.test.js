import React from 'react';
import { useDispatch } from 'react-redux';
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

    jest.clearAllMocks();
  });

  test('should update state on text change', async () => {
    useSelectorMock.mockReturnValueOnce(5);
    useDispatch.mockReturnValue(useDispatchMock);

    render(<NewReview />);

    const textField = screen.getByLabelText('leave your feedback about the service');
    userEvent.type(textField, 'This is a new review text');

    await waitFor(() => {
      expect(useDispatchMock).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'reviews/setNewReview',
          payload: {
            field: 'content',
            value: expect.stringContaining('This is a new review text'),
          },
        }),
      );
    }, { timeout: 3000 });

    jest.clearAllMocks();
  });

  test('should update state on rating change', async () => {
    useDispatch.mockReturnValue(useDispatchMock);

    render(<NewReview />);

    const textField = screen.getByLabelText('leave your feedback about the service');
    userEvent.type(textField, 'This is a new review text');

    const ratingLabel = screen.getByText('1 Star');
    /* eslint-disable testing-library/no-node-access */
    const ratingInput = ratingLabel.parentNode;
    /* eslint-disable testing-library/no-node-access */
    const inputElement = ratingInput.nextElementSibling;

    userEvent.click(inputElement);

    await waitFor(() => {
      expect(useDispatchMock).toHaveBeenCalledWith({
        type: 'reviews/setNewReview',
        payload: {
          field: 'rating',
          value: expect.any(Number),
        },
      });
    });
  });

  jest.clearAllMocks();
});
