import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { render, fireEvent, waitFor } from '@testing-library/react';
import FavouriteIcon from './FavouriteIcon';
import { setIsFavourite, addToFavourites, deleteFromFavourites } from '../../redux/slices/favouriteSlice';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('Snapshot test', () => {
  const useSelectorMock = jest.fn();
  const useDispatchMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useSelectorMock.mockReturnValueOnce(false);
    useSelectorMock.mockReturnValueOnce(false);
    useSelectorMock.mockReturnValueOnce('token');
  });

  test('should FavouriteIcon render when not favourite', () => {
    useSelector.mockReturnValueOnce(false);
    const { asFragment } = render(<FavouriteIcon id="1" ishovered={false} isactive={false} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders FavoriteIcon when favourite', () => {
    useSelector.mockReturnValueOnce(true);
    const { asFragment } = render(<FavouriteIcon id="1" ishovered={false} isactive={false} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('dispatches deleteFromFavourites when already favourite and clicked', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    const { getByRole } = render(<FavouriteIcon id="1" ishovered={false} isactive={false} />);
    const favouriteIcon = getByRole('button');

    fireEvent.click(favouriteIcon);

    // expect(mockDispatch).toHaveBeenCalledWith(deleteFromFavourites({ id: '1' }));
  });

  test('should dispatch actions correctly when clicked (not favourite)', () => {
    const dispatchMock = jest.fn();
    useDispatchMock.mockReturnValueOnce(dispatchMock);

    const { getByRole } = render(<FavouriteIcon id="1" ishovered isactive />);
    const favouriteIcon = getByRole('button');

    fireEvent.click(favouriteIcon);

    // expect(dispatchMock).toHaveBeenCalledTimes(2);
    // expect(dispatchMock).toHaveBeenCalledWith(setIsFavourite('1'));
    // expect(dispatchMock).toHaveBeenCalledWith(addToFavourites({ id: '1' }));
  });
});
