import { all } from 'redux-saga/effects';

import ListTopics from './ListTopics';
import AddComment from './AddComment';
import AddThread from './AddThread';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Users from './Users';

export default function* rootSaga() {
  yield all([ListTopics(), AddComment(), AddThread(), SignIn(), SignUp(), Users()]);
}
