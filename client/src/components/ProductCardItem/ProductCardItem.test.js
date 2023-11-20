import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { AlertContextProvider } from '../../context/AlertProvider';
import useAlert from '../../customHooks/useAlert';
import ProductCardItem from './ProductCardItem';
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

describe('ProductCardItem Component', () => {
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

    useAlert.mockReturnValue({
      alert: false,
      handleShowAlert: jest.fn(),
      handleCloseAlert: jest.fn(),
    });
  });

  test('should renders ProductCardItem component', () => {
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(true);

    const { asFragment } = render(
      <MemoryRouter>
        <AlertContextProvider>
          <ProductCardItem
            name="Product"
            description="About Product"
            itemNo="123"
            currentPrice={10.99}
            isTrending
            rating={4}
            imageUrl="image.jpg"
            isSupreme
            isHealthy
            _id="123"
            randomNum={36}
          />
        </AlertContextProvider>
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('open Modal with LoginForm', async () => {
    const mockDispatch = jest.fn();
    require('react-redux').useDispatch.mockReturnValue(mockDispatch);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(false);

    const { asFragment } = render(
      <MemoryRouter>
        <AlertContextProvider>
          <ProductCardItem dish={dish} />
        </AlertContextProvider>
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();

    const favouriteButton = screen.getByTestId('FavoriteBorderOutlinedIcon');

    fireEvent.click(favouriteButton);

    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(openModal).toHaveBeenCalled();
    expect(setContent).toHaveBeenCalled();
  });

  // test('should render rating stars', async () => {
  //   const dispatch = jest.fn();
  //   mockDispatch.mockReturnValueOnce(dispatch);
  //   jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(true);
  //   jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(false);

  //   render(
  //     <MemoryRouter>
  //       <AlertContextProvider>
  //         <ProductCard dish={dish} />
  //       </AlertContextProvider>
  //     </MemoryRouter>,
  //   );

  //   const ratingStar = screen.getAllByTestId('StarIcon');
  //   const rating = ratingStar.length;
  //   const expectedRating = dish.rating ?? 0;
  //   expect(rating).toBe(expectedRating);
  // });
});
