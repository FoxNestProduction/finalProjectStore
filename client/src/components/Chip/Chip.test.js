import React from 'react';
import { render } from '@testing-library/react';
import Chip from './Chip';

describe('smoke test', () => {
  test('should Chip render', () => {
    const { asFragment } = render(<Chip isHealthy="false" isTrending="false" isSupreme="false" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
