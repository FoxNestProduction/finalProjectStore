import React from 'react';
import { render } from '@testing-library/react';
import ColorChips from './Chip';

describe('smoke test', () => {
  test('should Chip render', () => {
    const { asFragment } = render(
      <ColorChips isHealthy={false} isTrending={false} isSupreme={false} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
