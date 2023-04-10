import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './components/app/app';
import HistoryRouter from '../src/components/history-route/history-route';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import browserHistory from './browser-history';
import Notification from './components/notification/notification';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        <Notification />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
