import React from 'react';
import { render } from '@testing-library/react';
import Alert from './Alert';

describe('smoke test', () => {
  test('should Alert render', () => {
    const { asFragment } = render(<Alert />);
    expect(asFragment()).toMatchSnapshot();
  });
});
