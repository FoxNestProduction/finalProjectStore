import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './reset.scss';
import { ThemeProvider } from '@mui/material/styles';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ErrorBoundary } from 'react-error-boundary';
import App from './App';
import store from './redux/store';
import globalTheme from './muiTheme/globalTheme';
import { injectStore } from './API/instance';
import { AlertContextProvider } from './context/AlertProvider';
import SomethingWentWrong from './pages/SomethingWentWrong/SomethingWentWrong';

const root = ReactDOM.createRoot(document.getElementById('root')); // eslint-disable-line no-undef
const persistor = persistStore(store);
injectStore(store);

root.render(
  <Provider store={store}>
    <ThemeProvider theme={globalTheme}>
      <ErrorBoundary fallback={<SomethingWentWrong />}>
        <BrowserRouter>
          <PersistGate persistor={persistor}>
            <AlertContextProvider>
              <App />
            </AlertContextProvider>
          </PersistGate>
        </BrowserRouter>
      </ErrorBoundary>
    </ThemeProvider>
  </Provider>,
);
