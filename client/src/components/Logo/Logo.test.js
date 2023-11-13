import React from 'react';
import { render } from '@testing-library/react';
import Logo from './Logo';

const Component = (props) => {
  return (
    <Logo />
  );
};

describe('Snapshot test', () => {
  it('should Logo in Footer render', () => {
    const { asFragment } = render(<Component type="footer" />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should Logo in Header render', () => {
    const { asFragment } = render(<Component />);

    expect(asFragment()).toMatchSnapshot();
  });
});
