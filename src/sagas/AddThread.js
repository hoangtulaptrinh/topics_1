import { put, call, takeEvery } from 'redux-saga/effects';

import { loadTopics } from '../actions';
import { TOPICS } from '../constants';
import { addThread } from '../api';

export function* handleAddThread(action) {
  const query = new URLSearchParams(window.location.search);

  const idTopics = query.get('idThread');

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
