import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FavouriteItem from './FavouriteItem';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  Link: ({ to, children }) => <a href={to}>{children}</a>,
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
    const { asFragment } = render(<FavouriteItem product={product} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should FavouriteItem added to cart', () => {
    const useDispatchMock = jest.spyOn(require('react-redux'), 'useDispatch');
    useDispatchMock.mockReturnValue(mockDispatch);

    const { getByRole } = render(<FavouriteItem product={product} />);
    const activeButton = getByRole('button', { name: 'Add To Cart' });
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
  })
});
