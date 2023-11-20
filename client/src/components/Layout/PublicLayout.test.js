import React from 'react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import store from '../../redux/store';
import PublicLayout from './PublicLayout';

describe('PublicLayout component', () => {
  test('should render PublicLayout component', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <PublicLayout />
        </MemoryRouter>
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
