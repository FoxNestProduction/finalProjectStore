import React from 'react';
import { render } from '@testing-library/react';
import CustomAlert from './Alert';

describe('smoke test', () => {
  test('should CustomAlert render', () => {
    const { asFragment } = render(<CustomAlert type="success" content="success" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
