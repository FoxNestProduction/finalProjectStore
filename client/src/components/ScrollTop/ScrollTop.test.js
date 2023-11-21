import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ScrollTop from './ScrollTop';

describe('ScrollTop component', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    window.scrollTo.mockRestore();
  });

  test('should render ScrollTop component', () => {
    const { asFragment } = render(<ScrollTop />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('ScrollTop component should scroll back to top when clicked', () => {
    render(<ScrollTop />);

    const scrollButton = screen.getByLabelText('scroll back to top');

    fireEvent.click(scrollButton);

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
