import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ReactDOM from 'react-dom';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import * as serviceWorker from './serviceWorker';
import configureStore from './store';
import history from './helper/history';
import Main from './components/Main';

const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Main />
      <ToastContainer />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
