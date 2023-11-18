import React from 'react';
import { render, screen } from '@testing-library/react';
import SwiperBanner from './SwiperBanner';

jest.mock('swiper/react', () => ({
  // eslint-disable-next-line react/prop-types
  Swiper: ({ children }) => <div data-testid="swiper-testid">{children}</div>,
  // eslint-disable-next-line react/prop-types
  SwiperSlide: ({ children }) => (
    <div data-testid="swiper-slide-testid">{children}</div>
  ),
}));

jest.mock('swiper', () => ({
  Navigation: (props) => null,
  Pagination: (props) => null,
  Scrollbar: (props) => null,
  A11y: (props) => null,
}));

describe('SwiperBanner', () => {
  test('should render SwiperBanner', () => {
    render(<SwiperBanner />);
    // expect(asFragment()).toMatchSnapshot();
    const slides = screen.getAllByTestId('swiper-slide-testid');
    expect(slides.length).toBe(1);
  });
});
