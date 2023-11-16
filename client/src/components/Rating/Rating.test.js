import React from 'react';
import { render } from '@testing-library/react';
import Rating from './Rating';

describe('smoke test', () => {
  test('should Rating render', () => {
    const { asFragment } = render(<Rating ratingValue="5" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
