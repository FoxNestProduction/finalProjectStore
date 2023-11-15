import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import configureStore from 'redux-mock-store';
import Modal from './Modal';
import { closeModal } from '../../redux/slices/modalSlice';
import { setAuthorizationError, setRegistrationError } from '../../redux/slices/errorSlice';

const mockStore = configureStore([]);
// jest.mock('react-redux');
// jest.spyOn(require('react-redux'), 'useSelector');
// const mockDispatch = jest.spyOn(require('react-redux'), 'useDispatch');

describe('Modal Component', () => {
  let store;
  // const useSelectorMock = jest.spyOn(require('react-redux'), 'useSelector');
  // const mockDispatch = jest.spyOn(require('react-redux'), 'useDispatch');

  beforeEach(() => {
    // useSelectorMock.mockReturnValueOnce(true);
    // useSelectorMock.mockReturnValueOnce('Title');
    // useSelectorMock.mockReturnValueOnce('Content');
    // useSelectorMock.mockReturnValueOnce({});
    // useSelectorMock.mockReturnValueOnce(false);

    store = mockStore({
      modal: {
        isOpen: true,
        title: 'Title',
        content: 'Content',
        buttonAgree: {},
        buttonBox: false,
      },
    });
  });

  test('renders Modal component', () => {
    jest.clearAllMocks();

    const { asFragment } = render(
      <Provider store={store}>
        <Modal isOpen={true} />
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();

    // jest.clearAllMocks();
  });

  // test('handles button click', async () => {
  //   mockDispatch.mockReturnValue(jest.fn());

  //   const { container } = render(
  //     <Provider store={store}>
  //       <Modal isOpen={true} />
  //     </Provider>
  //   );
  //  /* eslint-disable testing-library/no-node-access */
  //   // const buttonClose = getByRole('button');
  //   fireEvent.click(container);

  //   await waitFor(() => {
  //     expect(screen.getByText('Title')).toBeNull();
  //     expect(screen.getByText('Content')).toBeNull();
  //   });
    
  //   jest.clearAllMocks();
  // });

  // test('closes modal and resets states on handleClose', async () => {
  //   const dispatch = jest.fn();
  //   mockDispatch.mockReturnValue(dispatch);
  
  //   const { getByRole } = render(
  //     <Provider store={store}>
  //       <Modal isOpen={true} />
  //     </Provider>
  //   );
 
  //   const find = screen.getByText(/Close/);
  //   console.log(find);
    // expect(screen.queryByRole('button')).toBeInTheDocument();
    /* eslint-disable testing-library/no-node-access */
  //   const buttonClose = screen.getByRole(/dialog/);

  //   fireEvent.click(buttonClose);
  //   await waitFor(() => {
  //   expect(dispatch).toHaveBeenCalledTimes(3);
  //   // expect(dispatch).toHaveBeenCalledWith({ type: 'closeModal' });
  //   // expect(dispatch).toHaveBeenCalledWith({ type: 'setAuthorizationError', payload: '' });
  //   // expect(dispatch).toHaveBeenCalledWith({ type: 'setRegistrationError', payload: '' });
  //   });
  //   jest.clearAllMocks();
  // });
});
