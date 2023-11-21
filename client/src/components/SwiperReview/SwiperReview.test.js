import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import SwiperReview from './SwiperReview';

jest.mock('../../customHooks/useGetAPI', () => ({
  ...jest.requireActual('../../customHooks/useGetAPI'),
  useGetAPI: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  Routes: ({ children }) => children,
  Route: ({ element }) => element,
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('../../customHooks/useGetAPI', () => () => [
  {
    comments: [
      { _id: '1', customer: { firstName: 'John', lastName: 'Smit', content: 'Great product!' } },
      { _id: '2', customer: { firstName: 'Jane', lastName: 'Roberts', content: 'Awesome service!' } },
    ],
  },
  false,
  null,
]);

const fakeData = {
  comments: [
    { _id: '1', customer: { firstName: 'John', lastName: 'Smit', content: 'Great product!' } },
    { _id: '2', customer: { firstName: 'Jane', lastName: 'Roberts', content: 'Awesome service!' } },
  ],
};

const mockDispatch = jest.spyOn(require('react-redux'), 'useDispatch');

describe('SwiperReview Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should renders SwiperReview component', () => {
    mockDispatch.mockReturnValueOnce(jest.fn());
    useLocation.mockReturnValue({ pathname: '/' });
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<SwiperReview lastReviewsData={fakeData} />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('handles next button click', async () => {
    mockDispatch.mockReturnValueOnce(jest.fn());
    useLocation.mockReturnValue({ pathname: '/' });
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<SwiperReview lastReviewsData={fakeData} />} />
        </Routes>
      </MemoryRouter>,
    );
    const currentIndex = screen.getByText('Smit John');
    expect(currentIndex).toBeInTheDocument();

    const nextButton = screen.getByTestId('NavigateNextIcon');

    fireEvent.click(nextButton);

    const currentIndexNextAfterClick = await screen.findByText('Roberts Jane');
    expect(currentIndexNextAfterClick).toBeInTheDocument();
  });

  test('handles prev button click', async () => {
    mockDispatch.mockReturnValueOnce(jest.fn());
    useLocation.mockReturnValue({ pathname: '/' });
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<SwiperReview lastReviewsData={fakeData} />} />
        </Routes>
      </MemoryRouter>,
    );
    const currentIndex = screen.getByText('Roberts Jane');
    expect(currentIndex).toBeInTheDocument();

    const prevButton = screen.getByTestId('NavigateBeforeIcon');

    fireEvent.click(prevButton);

    const currentIndexNextAfterClick = await screen.findByText('Smit John');
    expect(currentIndexNextAfterClick).toBeInTheDocument();
  });
});
