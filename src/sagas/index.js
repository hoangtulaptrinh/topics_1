import { all } from 'redux-saga/effects';

import AddComment from './AddComment';
import AddThread from './AddThread';
import CareTopics from './CareTopics';
import ListTopics from './ListTopics';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Users from './Users';
import RefreshCurrentUser from './RefreshCurrentUser';

export default function* rootSaga() {
  yield all([ListTopics(), AddComment(), AddThread(), CareTopics(), SignIn(), SignUp(), Users(), RefreshCurrentUser()]);
}
