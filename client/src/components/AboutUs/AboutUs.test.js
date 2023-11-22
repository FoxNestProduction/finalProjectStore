import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import AboutUs from './AboutUs';

const Component = (props) => {
  return (
    <MemoryRouter>
      <AboutUs />
    </MemoryRouter>
  );
};

describe('Snapshot test', () => {
  test('should render AboutUs', () => {
    const { asFragment } = render(<Component />);

    expect(asFragment()).toMatchSnapshot();
  });
});
