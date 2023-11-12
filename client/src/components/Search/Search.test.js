import React from 'react';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Search from './Search';
import store from '../../redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store'; // Можливо, вам доведеться встановити цей пакет
import { fetchAllPartnersNames } from '../../redux/slices/partnersSlice'; // Замініть шлях на ваш фактичний шлях
import { fetchAllProductssNames } from '../../redux/slices/productsSlice'; // Замініть шлях на ваш фактичний шлях


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

// jest.mock('../../redux/slices/productsSlice', () => ({
//   ...jest.requireActual('../../redux/slices/productsSlice'),
//   fetchAllProductsNames: jest.fn().mockResolvedValue({}),
// }));

// jest.mock('../../redux/slices/partnersSlice', () => ({
//   ...jest.requireActual('../../redux/slices/partnersSlice'),
//   fetchAllPartnersNames: jest.fn().mockResolvedValue({}),
// }));

// describe('Search Component', () => {
//   let storeNew;

//   beforeEach(() => {
//     storeNew = mockStore({
//       search: {
//         inputSearchValue: '',
//         key: 'food', // чи 'restaurant' в залежності від вашого початкового стану
//         // Додайте інші відповідні властивості стану тут
//       },
//       products: {
//         allProductsNames: ['Product1', 'Product2'],
//       },
//       partners: {
//         allPartnersNames: ['Partner1', 'Partner2'],
//       },
//       // Додайте інші властивості стану срізів тут
//     });
//   });

//   it('renders Search component', async () => {
//     render (
//       <Provider store={storeNew}>
//         <Router>
//           <Search />
//         </Router>
//       </Provider>
//     );

//     // Додайте перевірки на основі поведінки вашого компонента
//     expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: 'Food' })).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: 'Restaurant' })).toBeInTheDocument();

//     // Приклад взаємодії з компонентом (натискання кнопки)
//     fireEvent.click(screen.getByRole('button', { name: 'Food' }));

//     await waitFor(() => {
//       expect(screen.getByTestId('some-element')).toHaveTextContent('Updated Text');
//     });
//   });

// });

  // it('handles input change', async () => {
  //   render (
  //     <Provider store={storeNew}>
  //       <Search />
  //     </Provider>
  //   );

  //   const input = screen.getByLabelText(/search food/i);

  //   fireEvent.change(input, { target: { value: 'NewInputValue' } });

  //   // Можливо, вам доведеться зачекати, щоб функція затримки виконалася
  //   await waitFor(() => {
  //     // Додайте перевірки на основі поведінки вашого компонента
  //     expect(store.getActions()).toContainEqual({
  //       type: 'search/setInputSearchValue',
  //       payload: 'NewInputValue',
  //     });
  //     // Додайте більше перевірок за необхідності
  //   });
  // });

  // Додайте більше випадків тестів на основі поведінки вашого компонента

  // Приклад тесту для кліку по кнопці
  // it('handles button click', () => {
  //   render (
  //     <Provider store={storeNew}>
  //       <Search />
  //     </Provider>
  //   );

  //   const foodButton = screen.getByRole('button', { name: 'Food' });

  //   fireEvent.click(foodButton);

  //   // Додайте перевірки на основі поведінки вашого компонента
  //   expect(store.getActions()).toContainEqual({
  //     type: 'search/setKey',
  //     payload: 'food',
  //   });
  //   // Додайте більше перевірок за необхідності
  // });

