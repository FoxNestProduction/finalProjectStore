import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import { AlertContextProvider } from '../../context/AlertProvider';
import useAlert from '../../customHooks/useAlert';
import ProductCard from './ProductCard';
import { addProductToCart, addToCart } from '../../redux/slices/cartSlice';
import { setIsFavourite, addToFavourites, deleteFromFavourites } from '../../redux/slices/favouriteSlice';
import { openModal, setContent } from '../../redux/slices/modalSlice';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../customHooks/useAlert', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../redux/slices/modalSlice', () => ({
  ...jest.requireActual('../../redux/slices/modalSlice'),
  openModal: jest.fn(),
  setContent: jest.fn(),
}));

jest.mock('../../redux/slices/cartSlice', () => ({
  ...jest.requireActual('../../redux/slices/cartSlice'),
  addProductToCart: jest.fn(),
  addToCart: jest.fn(),
}));

jest.mock('../../redux/slices/favouriteSlice', () => ({
  ...jest.requireActual('../../redux/slices/favouriteSlice'),
  setIsFavourite: jest.fn(),
  addToFavourites: jest.fn(),
  deleteFromFavourites: jest.fn(),
}));

const mockDispatch = jest.spyOn(require('react-redux'), 'useDispatch');

describe('ProductCard Component', () => {
  const dish = {
    name: 'Product',
    description: 'About Product',
    itemNo: '123',
    currentPrice: 10.99,
    isTrending: true,
    rating: 4,
    imageUrl: 'image.jpg',
    isSupreme: false,
    isHealthy: true,
    _id: '123',
    randomNum: 25,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(false);

    useAlert.mockReturnValue({
      alert: false,
      handleShowAlert: jest.fn(),
      handleCloseAlert: jest.fn(),
    });
  });

  test('should renders ProductCard component', () => {
    mockDispatch.mockReturnValueOnce(jest.fn());
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(true);

    const { asFragment } = render(
      <MemoryRouter>
        <AlertContextProvider>
          <ProductCard dish={dish} />
        </AlertContextProvider>
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('should ProductCard added to cart', async () => {
    const dispatch = jest.fn();
    mockDispatch.mockReturnValueOnce(dispatch);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(true);

    render(
      <MemoryRouter>
        <AlertContextProvider>
          <ProductCard dish={dish} />
        </AlertContextProvider>
      </MemoryRouter>,
    );

    const activeButton = screen.getByText('Add to card');

    fireEvent.click(activeButton);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(addProductToCart).toHaveBeenCalledWith(dish._id);
    expect(useAlert().handleShowAlert).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(useAlert().handleCloseAlert).toHaveBeenCalled();
    }, { timeout: 5000 });
  });

  test('should ProductCard when is not favourite', async () => {
    const dispatch = jest.fn();
    mockDispatch.mockReturnValueOnce(dispatch);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(true);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(false);

    render(
      <MemoryRouter>
        <AlertContextProvider>
          <ProductCard dish={dish} />
        </AlertContextProvider>
      </MemoryRouter>,
    );

    const favouriteButton = screen.getByText('Favourite');

    fireEvent.click(favouriteButton);

    expect(favouriteButton).toBeInTheDocument();
    expect(dispatch).toHaveBeenCalledTimes(2);
    await waitFor(() => {
      expect(addToFavourites).toHaveBeenCalledWith({ id: '123' });
    });
    expect(setIsFavourite).toHaveBeenCalledWith('123');
  });

  test('renders ProductCard when is favourite', async () => {
    const dispatch = jest.fn();
    mockDispatch.mockReturnValueOnce(dispatch);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(true);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(true);

    render(
      <MemoryRouter>
        <AlertContextProvider>
          <ProductCard dish={dish} />
        </AlertContextProvider>
      </MemoryRouter>,
    );

    const favouriteButton = screen.getByText('Favourite');

    fireEvent.click(favouriteButton);

    expect(favouriteButton).toBeInTheDocument();
    expect(dispatch).toHaveBeenCalledTimes(2);
    await waitFor(() => {
      expect(deleteFromFavourites).toHaveBeenCalledWith({ id: '123' });
    });
  });

  test('open Modal with LoginForm', async () => {
    const dispatch = jest.fn();
    mockDispatch.mockReturnValueOnce(dispatch);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(false);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(false);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(false);

    render(
      <MemoryRouter>
        <AlertContextProvider>
          <ProductCard dish={dish} />
        </AlertContextProvider>
      </MemoryRouter>,
    );

    const favouriteButton = screen.getByText('Favourite');

    fireEvent.click(favouriteButton);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(openModal).toHaveBeenCalled();
    expect(setContent).toHaveBeenCalled();
  });

  test('should add product to cart when user is not authorized', async () => {
    const dispatch = jest.fn();
    mockDispatch.mockReturnValueOnce(dispatch);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(false);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(false);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(false);

    render(
      <MemoryRouter>
        <AlertContextProvider>
          <ProductCard dish={dish} />
        </AlertContextProvider>
      </MemoryRouter>,
    );

    const activeButton = screen.getByText('Add to card');

    fireEvent.click(activeButton);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(addToCart).toHaveBeenCalled();
    expect(useAlert().handleShowAlert).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(useAlert().handleCloseAlert).toHaveBeenCalled();
    }, { timeout: 5000 });
  });

  test('should set isHovered and isActive state on mouse events', async () => {
    const dispatch = jest.fn();
    mockDispatch.mockReturnValueOnce(dispatch);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(false);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(false);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(false);

    render(
      <MemoryRouter>
        <AlertContextProvider>
          <ProductCard dish={dish} />
        </AlertContextProvider>
      </MemoryRouter>,
    );

    const favouriteIcon = screen.getByTestId('FavoriteBorderOutlinedIcon');
    fireEvent.mouseEnter(favouriteIcon);
    await waitFor(() => {
      expect(favouriteIcon).toHaveStyle({
        color: 'rgb(156, 39, 176)',
      });
    });
  });

  test('should render rating stars', async () => {
    const dispatch = jest.fn();
    mockDispatch.mockReturnValueOnce(dispatch);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(true);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(false);

    render(
      <MemoryRouter>
        <AlertContextProvider>
          <ProductCard dish={dish} />
        </AlertContextProvider>
      </MemoryRouter>,
    );

    const ratingStar = screen.getAllByTestId('StarIcon');
    const rating = ratingStar.length;
    const expectedRating = dish.rating ?? 0;
    expect(rating).toBe(expectedRating);
  });
});
