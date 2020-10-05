import { combineReducers } from 'redux';

import listTopics from './ListTopics';

const rootReducer = combineReducers({ listTopics: listTopics });

export default rootReducer;
