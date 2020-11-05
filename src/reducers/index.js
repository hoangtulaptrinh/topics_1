import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import detailTopic from './DetailTopic';
import listCategorys from './ListCategorys';
import listCourses from './ListCourses';
import listTopics from './ListTopics';
import listUsers from './ListUsers';
import reRender from './ReRender';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    detailTopic,
    listCategorys,
    listCourses,
    listTopics,
    listUsers,
    reRender,
  });

export default createRootReducer;
