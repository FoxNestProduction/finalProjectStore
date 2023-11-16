import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import FavouriteItem from './FavouriteItem';
import { addProductToCart } from '../../redux/slices/cartSlice';
import { AlertContextProvider } from '../../context/AlertProvider';
import useAlert from '../../customHooks/useAlert';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../redux/slices/cartSlice', () => ({
  ...jest.requireActual('../../redux/slices/cartSlice'),
  addProductToCart: jest.fn(),
}));

jest.mock('../../customHooks/useAlert', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockDispatch = jest.spyOn(require('react-redux'), 'useDispatch');

describe('Snapshot test', () => {
  mockDispatch.mockReturnValueOnce(jest.fn());

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

  beforeEach(() => {
    useAlert.mockReturnValue({
      alert: false,
      handleShowAlert: jest.fn(),
      handleCloseAlert: jest.fn(),
    });
  });

  test('should FavouriteItem render', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <AlertContextProvider>
          <FavouriteItem product={product} />
        </AlertContextProvider>
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should FavouriteItem added to cart', async () => {
    const dispatch = jest.fn();
    mockDispatch.mockReturnValueOnce(dispatch);

    render(
      <MemoryRouter>
        <AlertContextProvider>
          <FavouriteItem product={product} />
        </AlertContextProvider>
      </MemoryRouter>,
    );

    const activeButton = screen.getByRole('button', { name: 'Add To Cart' });

    fireEvent.click(activeButton);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(addProductToCart).toHaveBeenCalledWith(product._id);
    expect(useAlert().handleShowAlert).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(useAlert().handleCloseAlert).toHaveBeenCalled();
    }, { timeout: 5000 });
  });
});
