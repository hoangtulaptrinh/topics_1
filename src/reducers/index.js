import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import listUsers from './ListUsers';
import listCourses from './ListCourses';
import listTopics from './ListTopics';
import reRender from './ReRender';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    listUsers,
    listCourses,
    listTopics,
    reRender,
  });

export default createRootReducer;
