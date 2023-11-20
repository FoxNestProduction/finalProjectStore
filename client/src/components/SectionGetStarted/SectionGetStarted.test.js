import React from 'react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import store from '../../redux/store';
import SectionGetStarted from './SectionGetStarted';

describe('SectionGetStarted component', () => {
  test('should render SectionGetStarted component', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <SectionGetStarted />
        </MemoryRouter>
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
