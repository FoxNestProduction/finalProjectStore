import React from 'react';
import { render } from '@testing-library/react';
import RatingItem from './Rating';

describe('smoke test', () => {
  test('should RatingItem render', () => {
    const { asFragment } = render(<RatingItem ratingValue={5} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
