import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '../sagas';
import rootReducer from '../reducers';

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer(history), // root reducer with router state
    preloadedState,
    composeEnhancer(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        sagaMiddleware,
      ),
    ),
  );

  sagaMiddleware.run(rootSaga);
  return store;
}
