import React from 'react';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store'; // Можливо, вам доведеться встановити цей пакет
import Search from './Search';
import store from '../../redux/store';
import { fetchAllPartnersNames } from '../../redux/slices/partnersSlice'; // Замініть шлях на ваш фактичний шлях
import { fetchAllProductsNames } from '../../redux/slices/productsSlice'; // Замініть шлях на ваш фактичний шлях

const mockStore = configureStore();

const Component = (props) => {
  return (
    <Provider store={store}>
      <Router>
        <Search />
      </Router>
    </Provider>
  );
};

describe('Snapshot test', () => {
  test('should Search render', () => {
    const { asFragment } = render(<Component />);

    expect(asFragment()).toMatchSnapshot();
  });
});

