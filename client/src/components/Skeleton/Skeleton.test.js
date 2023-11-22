import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import Skeleton from './Skeleton';

describe('Skeleton component', () => {
  test('Restaurant skeleton snapshot', () => {
    const { asFragment } = render(
      <Skeleton skeletonType="restaurant" />,
    );

    const card = screen.getByTestId('restaurant');
    expect(asFragment()).toMatchSnapshot();
    expect(card).toBeInTheDocument();
  });

  test('OneProductPage skeleton snapshot', () => {
    render(
      <Skeleton skeletonType="oneProductPage" />,
    );

    const card = screen.getByTestId('oneProductPage');
    expect(card).toBeInTheDocument();
  });
});
