import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Modal from './Modal';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('Modal Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      modal: {
        title: 'Title',
        content: 'Content',
      },
    });
  });

  test('renders Modal component', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Modal />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });


  // test('handles button click', async () => {
  //   render(
  //     <Provider store={store}>
  //       <Modal open={true} />
  //     </Provider>
  //   );
    
  //   const closeButton = screen.getByText('Close');
  //   fireEvent.click(closeButton);
  //   await waitFor(() => {
  //     expect(screen.queryByText('Title')).toBeNull();
  //     expect(screen.queryByText('Content')).toBeNull();
  //   });
  // });
});


