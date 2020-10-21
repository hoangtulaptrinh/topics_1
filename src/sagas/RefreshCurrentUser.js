import { call, put, takeEvery } from 'redux-saga/effects';

import { getDetailUser } from '../api';
import { USER } from '../constants';
import { reRender } from '../actions';

export function* handleRefreshCurrentUser() {
  try {
    const response = yield call(getDetailUser); // phải viết call(fetchTopics, idTopics) thay vì call(fetchTopics(idTopics))
    localStorage.currentUser = JSON.stringify(response.data.user);
    yield put(reRender());
  } catch (error) {
    console.log(error.message);
  }
}

export default function* watchAddThread() {
  yield takeEvery(USER.REFRESH_CURRENT_USER, handleRefreshCurrentUser);
}
