import React from 'react';
import { render } from '@testing-library/react';
import Features from './Features';

describe('Features component', () => {
  test('should render Features component', () => {
    const { asFragment } = render(<Features />);
    expect(asFragment()).toMatchSnapshot();
  });
});
