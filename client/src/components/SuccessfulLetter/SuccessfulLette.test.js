import React from 'react';
import { render } from '@testing-library/react';
import SuccessfulLetter from './SuccessfulLetter';

describe('Snapshot test', () => {
  test('should SuccessfulLetter render', () => {
    const { asFragment } = render(<SuccessfulLetter />);
    expect(asFragment()).toMatchSnapshot();
  });
});
