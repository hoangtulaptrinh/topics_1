import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import ReactDOM from 'react-dom';

import './index.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import 'react-toastify/dist/ReactToastify.css';
import 'video-react/dist/video-react.css';
import * as serviceWorker from './serviceWorker';
import configureStore, { history } from './store';
import Main from './components/Main';

const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {/* place ConnectedRouter under Provider */}
      <Main />
      <ToastContainer />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
