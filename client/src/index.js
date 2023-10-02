import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './reset.scss';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import store from './redux/store';
import globalTheme from './muiTheme/globalTheme';

const root = ReactDOM.createRoot(document.getElementById('root')); // eslint-disable-line no-undef
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={globalTheme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
);
