import { put, call, takeEvery } from 'redux-saga/effects';

import { loadTopics } from '../actions';
import { TOPICS } from '../constants';
import { addThread } from '../api';

export function* handleAddThread(action) {
  const idTopics = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];

  try {
    yield call(addThread, { ...action.data }, idTopics); // phải viết call(fetchTopics, idTopics) thay vì call(fetchTopics(idTopics))
    yield put(loadTopics());
  } catch (error) {
    console.log(error.message);
  }
}

export default function* watchAddThread() {
  yield takeEvery(TOPICS.ADD_THREAD, handleAddThread);
}
