import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from './NotFound';

describe('NotFound Pages', () => {
  test('should NotFound Pages', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
