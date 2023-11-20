import React from 'react';
import { render, screen } from '@testing-library/react';
import { useMediaQuery } from '@mui/material';
import Contact from './Contact';

jest.mock('@mui/material/', () => ({
  ...jest.requireActual('@mui/material/'),
  useMediaQuery: jest.fn(),
}));

describe('Contact Pages', () => {
  test('should Contact Pages', () => {
    useMediaQuery.mockReturnValue(true);
    useMediaQuery.mockReturnValue(false);
    useMediaQuery.mockReturnValue(false);

    const { asFragment } = render(
      <Contact />,
    );
    expect(asFragment()).toMatchSnapshot();

    const title = screen.getByText('Contact Us');

    expect(title).toBeInTheDocument();

    jest.clearAllMocks();
  });
});
