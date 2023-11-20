import React from 'react';
import { render } from '@testing-library/react';
import AboutUs from './AboutUs';

describe('AboutUs Pages', () => {
  test('should AboutUs Pages', () => {
    const { asFragment } = render(<AboutUs />);
    expect(asFragment()).toMatchSnapshot();
  });
});
