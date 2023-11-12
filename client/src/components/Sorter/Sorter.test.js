import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Sorter from './Sorter';
import store from '../../redux/store';

const Component = (props) => {
  return (
    <Provider store={store}>
      <Sorter />
    </Provider>
  );
};

describe('Snapshot test', () => {
  test('should Sorter render', () => {
    const { asFragment } = render(<Component />);

    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Sorter Component', () => {
  test('Sorter handles select change and dispatches actions', async () => {
    const { findByLabelText, getByText } = render(<Component type="partners" />);
    const sortSelect = await screen.findByLabelText('Sort by');

    // Відкриваємо випадаючий список
    fireEvent.mouseDown(sortSelect);

    // Вибираємо значення
    const optionRatingUp = screen.getByText('Rating UP');
    fireEvent.click(optionRatingUp);

    const optionRatingDown = screen.getByText('Rating DOWN');
    fireEvent.click(optionRatingDown);

    const optionDefault = screen.getByText('Default');
    fireEvent.click(optionDefault);
  });
});
describe('Sorter Component', () => {
  test('Sorter handles select change and dispatches actions', async () => {
    const { findByLabelText, getByText } = render(<Component type="products" />);
    const sortSelect = await screen.findByLabelText('Sort by');

    // Відкриваємо випадаючий список
    fireEvent.mouseDown(sortSelect);

    // Вибираємо значення
    const optionRatingUp = screen.getByText('Rating UP');
    fireEvent.click(optionRatingUp);

    const optionRatingDown = screen.getByText('Rating DOWN');
    fireEvent.click(optionRatingDown);

    const optionPriceUp = screen.getByText('Price UP');
    fireEvent.click(optionPriceUp);

    const optionPriceDown = screen.getByText('Price DOWN');
    fireEvent.click(optionPriceDown);

    const optionDefault = screen.getByText('Default');
    fireEvent.click(optionDefault);
  });
});
