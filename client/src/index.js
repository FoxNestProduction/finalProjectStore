import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './reset.scss';
import App from './App';
import store from './redux/store';
import MuiThemeProvider from './context/MuiThemeProvider';

const root = ReactDOM.createRoot(document.getElementById('root')); // eslint-disable-line no-undef
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
);
