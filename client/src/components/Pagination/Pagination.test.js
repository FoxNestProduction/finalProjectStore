import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AppPagination from './Pagination';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const mockDispatch = jest.spyOn(require('react-redux'), 'useDispatch');

describe('AppPagination Component', () => {
  test('should renders AppPagination component', () => {
    const dispatch = jest.fn();
    mockDispatch.mockReturnValueOnce(dispatch);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(1);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce('');

    const { asFragment } = render(
      <AppPagination pageQty={5} />,
    );

    expect(asFragment()).toMatchSnapshot();
    const nextPage = screen.getByLabelText('Go to page 2');
    fireEvent.click(nextPage);
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
