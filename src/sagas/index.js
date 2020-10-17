import { all } from 'redux-saga/effects';

import addComment from './AddComment';
import addThread from './AddThread';
import careTopics from './CareTopics';
import listTopics from './ListTopics';
import signIn from './SignIn';
import signUp from './SignUp';
import users from './Users';
import refreshCurrentUser from './RefreshCurrentUser';
import listCourses from './ListCourses';

export default function* rootSaga() {
  yield all([
    listTopics(),
    addComment(),
    addThread(),
    careTopics(),
    signIn(),
    signUp(),
    users(),
    refreshCurrentUser(),
    listCourses(),
  ]);
}
