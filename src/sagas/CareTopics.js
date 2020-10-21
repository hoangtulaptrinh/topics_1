import { call, put, takeEvery } from 'redux-saga/effects';

import { TOPICS } from '../constants';
import { updateCurrentUser } from '../api';
import { refreshCurrentUser } from '../actions';

export function* handleCareTopics(action) {
  try {
    yield call(updateCurrentUser, { care: action.data }); // phải viết call(fetchTopics, idTopics) thay vì call(fetchTopics(idTopics))
    yield put(refreshCurrentUser());
  } catch (error) {
    console.log(error.message);
  }
}

export default function* watchAddThread() {
  yield takeEvery(TOPICS.CARE_TOPICS, handleCareTopics);
}
