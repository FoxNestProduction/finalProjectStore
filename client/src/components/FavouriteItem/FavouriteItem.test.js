import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { screen, render, fireEvent } from '@testing-library/react';
import FavouriteItem from './FavouriteItem';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('Snapshot test', () => {
  const mockDispatch = jest.fn();

  const product = {
    name: 'Product',
    itemNo: '123',
    currentPrice: 10.99,
    isTrending: true,
    rating: 4,
    imageUrl: 'image.jpg',
    isSupreme: false,
    isHealthy: true,
    _id: '123',
  };

  test('should FavouriteItem render', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <FavouriteItem product={product} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should FavouriteItem added to cart', () => {
    const useDispatchMock = jest.spyOn(require('react-redux'), 'useDispatch');
    useDispatchMock.mockReturnValue(mockDispatch);

    render(
      <MemoryRouter>
        <FavouriteItem product={product} />
      </MemoryRouter>
    );
      
    const activeButton = screen.getByRole('button', { name: 'Add To Cart' });
    fireEvent.click(activeButton);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'cart/addToCart',
      payload: {
        product: {
          _id: '123',
          currentPrice: 10.99,
          imageUrl: 'image.jpg',
          name: 'Product',
        },
        cartQuantity: 1,
      },
    });
  });
});
