import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import MiniCartItem from './MiniCartItem';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const mockDispatch = jest.spyOn(require('react-redux'), 'useDispatch');

describe('MiniCartItem Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should renders MiniCartItem component', () => {
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce([]);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(true);

    const { asFragment } = render(
      <MemoryRouter>
        <MiniCartItem
          name="Product"
          currentPrice={10.99}
          imageUrl="image.jpg"
          cartQuantity={1}
          _id="123"
        />
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('should delete product product when click dell', () => {
    const dispatch = jest.fn();
    mockDispatch.mockReturnValueOnce(dispatch);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce([]);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(true);

    render(
      <MemoryRouter>
        <MiniCartItem
          name="Product"
          currentPrice={10.99}
          imageUrl="image.jpg"
          cartQuantity={1}
          _id="123"
        />
      </MemoryRouter>,
    );

    const deleteButtons = screen.getAllByTestId('RemoveRoundedIcon');
    fireEvent.click(deleteButtons[0]);
    expect(dispatch).toHaveBeenCalled();
  });

  test('should added one product when click plus', () => {
    const dispatch = jest.fn();
    mockDispatch.mockReturnValueOnce(dispatch);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce([]);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(true);

    render(
      <MemoryRouter>
        <MiniCartItem
          name="Product"
          currentPrice={10.99}
          imageUrl="image.jpg"
          cartQuantity={1}
          _id="123"
        />
      </MemoryRouter>,
    );

    const addButtons = screen.getAllByTestId('AddRoundedIcon');
    fireEvent.click(addButtons[0]);
    expect(dispatch).toHaveBeenCalled();
  });
});
