import React from 'react';
import { render } from '@testing-library/react';
import PartnersCard from './PartnersCard';

describe('ProductCardItem Component', () => {
  test('should renders ProductCardItem component', () => {
    const { asFragment } = render(
      <PartnersCard partner={{}} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
