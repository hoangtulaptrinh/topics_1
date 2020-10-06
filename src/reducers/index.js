import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import listTopics from './ListTopics';
import listUsers from './ListUsers';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    listTopics,
    listUsers,
  });

export default createRootReducer;
