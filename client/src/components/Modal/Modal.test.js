import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Modal from './Modal';
import { closeModal } from '../../redux/slices/modalSlice';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('../../redux/slices/modalSlice', () => ({
  ...jest.requireActual('../../redux/slices/modalSlice'),
  closeModal: jest.fn(),
}));
const mockDispatch = jest.spyOn(require('react-redux'), 'useDispatch');

describe('Modal Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should renders Modal component with provided data', () => {
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(true);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce('Title');
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce('Content');
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce({});
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(false);

    // eslint-disable-next-line testing-library/render-result-naming-convention
    const component = render(
      <Modal />,
    );

    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(false);
    expect(component).toMatchSnapshot();
  });

  test('should handles button click', () => {
    const dispatch = jest.fn();
    mockDispatch.mockReturnValueOnce(dispatch);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(true);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce('Title');
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce('Content');
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce({});
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(false);

    // eslint-disable-next-line testing-library/render-result-naming-convention
    const component = render(
      <Modal />,
    );

    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(false);

    const modal = screen.getByTestId('CloseIcon');
    fireEvent.click(modal);

    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(closeModal).toHaveBeenCalled();
  });

  test('should renders buttons and handles clicks', () => {
    const dispatch = jest.fn();
    mockDispatch.mockReturnValueOnce(dispatch);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(true);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce('Title');
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce('Content');
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce({});
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(true);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce({
      endIcon: true,
      startIcon: false,
      onClick: jest.fn(),
      disabled: false,
      text: 'Agree',
    });

    // eslint-disable-next-line testing-library/render-result-naming-convention
    const component = render(<Modal />);
    expect(component).toMatchSnapshot();

    const closeButton = screen.getByText('Close');
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);

    expect(closeModal).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(3);

    const agreeButton = screen.getByRole('radio');
    expect(agreeButton).toBeInTheDocument();

    fireEvent.click(agreeButton);

    expect(closeModal).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});
