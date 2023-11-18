import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import SwiperReview from './SwiperReview';

jest.mock('../../customHooks/useGetAPI', () => ({
  ...jest.requireActual('../../customHooks/useGetAPI'),
  useGetAPI: jest.fn(),
}));

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: jest.fn(),
  // useParams: () => ({
  //   hash: '123',
  // }),
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

describe('SwiperReview Component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // test('should renders SwiperReview component', () => {
  
  //   const { asFragment } = render(
  //     <SwiperReview fakeData={fakeData} />
  //   );

  //   expect(asFragment()).toMatchSnapshot();
  // });

  // test('handles next button click', () => {
  //   render(<SwiperReview />);
  //   const nextButton = screen.getByLabelText('next');

  //   fireEvent.click(nextButton);

  //   expect()

  //   const currentIndex = screen.getByText('Current Index:').nextSibling;
  //   expect(currentIndex.textContent).toBe('2');
  // });

  // test('handles prev button click', () => {
  //   render(<SwiperReview />);
  //   const prevButton = screen.getByLabelText('prev');

  //   const fakeData = {
  //     comments: [
  //       { _id: '1', customer: { name: 'John', review: 'Great product!' } },
  //       { _id: '2', customer: { name: 'Jane', review: 'Awesome service!' } },
  //     ],
  //   };

  //   // Можливо, вам потрібно симулювати результат useGetAPI
  //   jest.mock('../../customHooks/useGetAPI', () => () => [fakeData, false, null]);

  //   // Симулюйте клік на кнопку "Prev"
  //   fireEvent.click(prevButton);

  //   // Перевірте, чи відбулася очікувана зміна стану
  //   // Наприклад, перевірте, чи відбулося зменшення currentIndex

  //   // Зробіть необхідні перевірки щодо змін у компоненті
  // });
});
