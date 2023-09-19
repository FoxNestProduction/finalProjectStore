import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './reset.scss';
import App from './App';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root')); // eslint-disable-line no-undef
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
