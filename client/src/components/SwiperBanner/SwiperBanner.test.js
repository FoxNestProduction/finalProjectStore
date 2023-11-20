// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper';
// import { render, screen, fireEvent } from '@testing-library/react';
// import SwiperBanner from './SwiperBanner';
// import styles from './SwiperBanner.module.scss';

// jest.mock('swiper', () => {
//   const originalModule = jest.requireActual('swiper/react');
//   return {
//     ...originalModule,
//     Swiper: jest.fn(),
//     SwiperSlide: jest.fn(),
//   };
// });

// jest.mock('swiper', () => ({
//   ...jest.requireActual('swiper'),
//   modules: {
//     ...jest.requireActual('swiper/modules'),
//     autoplay: {
//       ...jest.requireActual('swiper/modules/autoplay'),
//       default: jest.fn(),
//     },
//     effectCube: {
//       ...jest.requireActual('swiper/modules/effect-cube'),
//       default: jest.fn(),
//     },
//     pagination: {
//       ...jest.requireActual('swiper/modules/pagination'),
//       default: jest.fn(),
//     },
//   },
// }));

// describe('SwiperBanner component', () => {
//   test('renders SwiperBanner component', () => {
//     const { asFragment } = render(<SwiperBanner />);
//       expect(asFragment()).toMatchSnapshot();
//   });
// });
