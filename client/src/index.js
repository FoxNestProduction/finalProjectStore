import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './reset.scss';
import { ThemeProvider } from '@mui/material/styles';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import App from './App';
import store from './redux/store';
import globalTheme from './muiTheme/globalTheme';
import { injectStore } from './API/instance';

const root = ReactDOM.createRoot(document.getElementById('root')); // eslint-disable-line no-undef
const persistor = persistStore(store);
injectStore(store);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={globalTheme}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
);
