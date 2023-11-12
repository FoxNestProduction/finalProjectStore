import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Footer from './Footer';

const Component = (props) => {
  return (
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
};

describe('Snapshot test', () => {
  test('should render Footer', () => {
    const { asFragment } = render(<Component />);

    expect(asFragment()).toMatchSnapshot();
  });
});
