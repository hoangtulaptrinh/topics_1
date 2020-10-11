import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import listTopics from './ListTopics';
import listUsers from './ListUsers';
import reRender from './ReRender';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    listTopics,
    listUsers,
    reRender,
  });

export default createRootReducer;
