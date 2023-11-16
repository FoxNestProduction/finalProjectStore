import React from 'react';
import { render } from '@testing-library/react';
import SwiperBanner from './SwiperBanner';

jest.mock('swiper/react', () => {
  const originalModule = jest.requireActual('swiper/react');
  return {
    ...originalModule,
    Swiper: jest.fn(),
    SwiperSlide: jest.fn(),
  };
});

jest.mock('swiper', () => ({
  ...jest.requireActual('swiper'),
  modules: {
    ...jest.requireActual('swiper/modules'),
    autoplay: {
      ...jest.requireActual('swiper/modules/autoplay'),
      default: jest.fn(),
    },
    effectCube: {
      ...jest.requireActual('swiper/modules/effect-cube'),
      default: jest.fn(),
    },
    pagination: {
      ...jest.requireActual('swiper/modules/pagination'),
      default: jest.fn(),
    },
  },
}));

describe('SwiperBanner', () => {
  test('should render SwiperBanner', () => {
    const { asFragment } = render(<SwiperBanner />);
    expect(asFragment()).toMatchSnapshot();
  });
});
