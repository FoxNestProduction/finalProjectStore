import React from 'react';
import { render } from '@testing-library/react';
import ArrowIcon from './ArrowIcon';

describe('ArrowIcon component', () => {
  test('should render ArrowIcon component', () => {
    const { asFragment } = render(<ArrowIcon />);
    expect(asFragment()).toMatchSnapshot();
  });
});
