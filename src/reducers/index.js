import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import listTopics from './ListTopics';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    listTopics: listTopics,
  });
export default createRootReducer;
