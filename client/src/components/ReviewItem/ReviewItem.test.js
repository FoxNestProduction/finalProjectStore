import React from 'react';
import { useDispatch } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ReviewItem from './ReviewItem';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
  Routes: ({ children }) => children,
  Route: ({ element }) => element,
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../redux/slices/reviewsSlice', () => ({
  ...jest.requireActual('../../redux/slices/reviewsSlice'),
  searchReviews: jest.fn(),
  setIndexSearchReview: jest.fn(),
}));

const mockDispatch = jest.spyOn(require('react-redux'), 'useDispatch');

describe('ReviewItem component', () => {
  const review = {
    _id: '1',
    rating: 4,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    date: '2023-11-09T12:00:00Z',
    customer: {
      lastName: 'Doe',
      firstName: 'John',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(false);
  });

  test('should render ReviewItem', () => {
    mockDispatch.mockReturnValueOnce(jest.fn());
    useLocation.mockReturnValue({ pathname: '/' });

    const { asFragment } = render(
      <MemoryRouter initialEntries={['/reviews']}>
        <Routes>
          <Route path="/reviews" element={<ReviewItem review={review} index={0} />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('should render ReviewItem with correct data', () => {
    useLocation.mockReturnValue({ pathname: '/' });

    render(
      <MemoryRouter initialEntries={['/reviews']}>
        <Routes>
          <Route path="/reviews" element={<ReviewItem review={review} index={0} />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Doe John')).toBeInTheDocument();
    expect(screen.getByText('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')).toBeInTheDocument();
    expect(screen.getByText('09.11.2023')).toBeInTheDocument();
  });

  test('should get searchReview ReviewItem', () => {
    useLocation.mockReturnValue({ pathname: '/' });
    const dispatch = jest.fn();
    mockDispatch.mockReturnValueOnce(dispatch);
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);
    render(
      <MemoryRouter initialEntries={['/reviews']}>
        <Routes>
          <Route path="/reviews" element={<ReviewItem review={review} index={0} />} />
        </Routes>
      </MemoryRouter>,
    );

    const reviewItem = screen.getByText(/Lorem ipsum/);
    fireEvent.click(reviewItem);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(navigateMock).toHaveBeenCalledWith('/reviews');

    expect(useDispatch).toHaveBeenCalled();
  });

  test('should do not get searchReview ReviewItem, when location "/reviews"', () => {
    useLocation.mockReturnValue({ pathname: '/reviews' });
    const dispatch = jest.fn();
    mockDispatch.mockReturnValueOnce(dispatch);
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);
    render(
      <MemoryRouter initialEntries={['/reviews']}>
        <Routes>
          <Route path="/reviews" element={<ReviewItem review={review} index={0} />} />
        </Routes>
      </MemoryRouter>,
    );

    const reviewItem = screen.getByText(/Lorem ipsum/);
    fireEvent.click(reviewItem);

    expect(dispatch).not.toHaveBeenCalled();
    expect(navigateMock).not.toHaveBeenCalled();
  });

  test('should render ReviewItem, when location "/"', () => {
    useLocation.mockReturnValue({ pathname: '/' });
    const dispatch = jest.fn();
    mockDispatch.mockReturnValueOnce(dispatch);
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);
    const reviewLong = {
      _id: '1',
      rating: 4,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. orem ipsum dolor sit amet, consectetur adipiscing elit. orem ipsum dolor sit amet, consectetur adipiscing elit.',
      date: '2023-11-09T12:00:00Z',
      customer: {
        lastName: 'Doe',
        firstName: 'John',
      },
    };
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<ReviewItem review={reviewLong} index={0} />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
    const reviewItem = screen.getByText(/Lorem ipsum/);
    expect(reviewItem).toHaveStyle({
      textOverflow: 'ellipsis',
    });
  });
});
