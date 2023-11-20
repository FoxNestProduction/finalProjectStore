import React from 'react';
import { screen, render, fireEvent, waitFor, act } from '@testing-library/react';
import FavouriteIcon from './FavouriteIcon';
import { setIsFavourite, addToFavourites, deleteFromFavourites } from '../../redux/slices/favouriteSlice';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('../../redux/slices/favouriteSlice', () => ({
  ...jest.requireActual('../../redux/slices/favouriteSlice'),
  setIsFavourite: jest.fn(),
  addToFavourites: jest.fn(),
  deleteFromFavourites: jest.fn(),
}));
const mockDispatch = jest.spyOn(require('react-redux'), 'useDispatch');

describe('Snapshot test', () => {
  test('should FavouriteIcon render when not favourite', async () => {
    const dispatch = jest.fn();
    mockDispatch.mockReturnValueOnce(dispatch);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(false);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(false);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce('token');

    const { asFragment } = render(<FavouriteIcon id="1" />);
    expect(asFragment()).toMatchSnapshot();

    const favouriteIconFalse = screen.getByTestId('FavoriteBorderOutlinedIcon');

    fireEvent.click(favouriteIconFalse);

    expect(favouriteIconFalse).toBeInTheDocument();
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(setIsFavourite).toHaveBeenCalled();
    await waitFor(() => {
      expect(addToFavourites).toHaveBeenCalledWith({ id: '1' });
    });

    jest.clearAllMocks();
  });

  test('renders FavoriteIcon when favourite', async () => {
    const dispatch = jest.fn();
    mockDispatch.mockReturnValueOnce(dispatch);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(true);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(false);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce('token');

    const { asFragment } = render(<FavouriteIcon id="1" isactive={false} ishovered={false} />);
    expect(asFragment()).toMatchSnapshot();

    const favouriteIconTrue = screen.getByTestId('FavoriteIcon');

    fireEvent.click(favouriteIconTrue);

    expect(favouriteIconTrue).toBeInTheDocument();
    expect(dispatch).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(deleteFromFavourites).toHaveBeenCalledWith({ id: '1' });
    });

    jest.clearAllMocks();
  });

  test('styles button isHovered', () => {
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(false);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(false);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce('token');
    render(
      <FavouriteIcon id="1" ishovered isactive={false} />,
    );

    const button = screen.getByTestId('FavoriteBorderOutlinedIcon');
    expect(button).toHaveStyle({
      color: 'rgb(156, 39, 176)',
    });

    jest.clearAllMocks();
  });

  test('sstyles button isActive', () => {
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(false);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(false);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce('token');
    render(
      <FavouriteIcon id="1" ishovered={false} isactive />,
    );

    const button = screen.getByTestId('FavoriteBorderOutlinedIcon');
    expect(button).toHaveStyle({
      color: 'rgb(156, 39, 176)',
    });

    jest.clearAllMocks();
  });

  test('sstyles button is not authorizaite', async () => {
    const dispatch = jest.fn();
    mockDispatch.mockReturnValueOnce(dispatch);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(false);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(false);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce('');
    render(
      <FavouriteIcon id="1" ishovered={false} isactive={false} />,
    );

    const favouriteIconFalse = screen.getByTestId('FavoriteBorderOutlinedIcon');

    fireEvent.click(favouriteIconFalse);

    await waitFor(() => {
      expect(dispatch).not.toHaveBeenCalled();
    });

    jest.clearAllMocks();
  });
});
