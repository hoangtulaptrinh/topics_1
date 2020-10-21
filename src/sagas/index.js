import { all } from 'redux-saga/effects';

import addComment from './AddComment';
import addThread from './AddThread';
import careTopics from './CareTopics';
import listCategory from './ListCategory';
import listCourses from './ListCourses';
import listTopics from './ListTopics';
import refreshCurrentUser from './RefreshCurrentUser';
import signIn from './SignIn';
import signUp from './SignUp';
import users from './Users';

export default function* rootSaga() {
  yield all([
    addComment(),
    addThread(),
    careTopics(),
    listCategory(),
    listCourses(),
    listTopics(),
    refreshCurrentUser(),
    signIn(),
    signUp(),
    users(),
  ]);
}
