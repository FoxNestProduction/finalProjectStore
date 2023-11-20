import React from 'react';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Search from './Search';
import store from '../../redux/store';
import { fetchAllPartnersNames } from '../../redux/slices/partnersSlice';
import { fetchAllProductsNames } from '../../redux/slices/productsSlice';

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

// import React from 'react';
// import { fireEvent, render, waitFor, screen } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import configureStore from 'redux-mock-store';

// import Search from './Search';
// import {
//   fetchAllProductsNames,
//   fetchAllPartnersNames,
//   deleteFilteredData,
//   resetFilterParams,
//   setKey,
//   setInputSearchValue,
//   setSearch,
//   resetSearch,
//   fetchSearchedProductsOrPartners,
// } from '../../redux/slices/searchSlice';

// const mockStore = configureStore();

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: jest.fn(),
// }));

// jest.mock('react-redux', () => ({
//   ...jest.requireActual('react-redux'),
//   useDispatch: jest.fn(),
//   useSelector: jest.fn(),
// }));

// jest.mock('../../redux/slices/productsSlice', () => ({
//   ...jest.requireActual('../../redux/slices/productsSlice'),
//   fetchAllProductsNames: jest.fn(),
// }));

// jest.mock('../../redux/slices/partnersSlice', () => ({
//   ...jest.requireActual('../../redux/slices/partnersSlice'),
//   fetchAllPartnersNames: jest.fn(),
// }));

// jest.mock('../../redux/slices/searchSlice', () => ({
//   ...jest.requireActual('../../redux/slices/searchSlice'),
//   setKey: jest.fn(),
//   setInputSearchValue: jest.fn(),
//   setSearch: jest.fn(),
//   resetSearch: jest.fn(),
//   fetchSearchedProductsOrPartners: jest.fn(),
// }));

// jest.mock('../../redux/slices/filterSlice', () => ({
//   ...jest.requireActual('../../redux/slices/filterSlice'),
//   deleteFilteredData: jest.fn(),
//   resetFilterParams: jest.fn(),
// }));

// const mockDispatch = jest.spyOn(require('react-redux'), 'useDispatch');

// describe('Snapshot test', () => {
//   const store = mockStore({
//     search: {
//       search: [],
//       key: 'food',
//       inputSearchValue: '',
//     },
//     partners: {
//       allPartnersNames: ['partner1', 'partner2'],
//     },
//     products: {
//       allProductsNames: ['product1', 'product2'],
//     },
//   });

//   beforeEach(() => {
//     jest.clearAllMocks();
//     jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(false);
//   });

//   test('should Search render', () => {
//     const dispatch = jest.fn();
//     mockDispatch.mockReturnValueOnce(dispatch);
//     const navigateMock = jest.fn();
//     useNavigate.mockReturnValue(navigateMock);

//     const { asFragment } = render(
//       <Provider store={store}>
//         <Router>
//           <Search />
//         </Router>
//       </Provider>
//     );

//     expect(asFragment()).toMatchSnapshot();

//     expect(store.getActions()).toEqual([fetchAllProductsNames(), fetchAllPartnersNames()]);
//   });
// });
