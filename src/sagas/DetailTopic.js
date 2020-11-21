import { put, call, takeEvery } from 'redux-saga/effects';

import { setDetailTopics, setDetailTopicsError } from '../actions';
import { TOPICS } from '../constants';
import { fetchDetailTopics } from '../api';

export function* handleDetailTopicsLoad() {
  const query = new URLSearchParams(window.location.search);

  const idThread = query.get('idThread');
  const id = query.get('id');

  try {
    const data = yield call(fetchDetailTopics, idThread, id); // phải viết call(fetchDetailTopics, idTopics) thay vì call(fetchDetailTopics(idTopics))
    yield put(setDetailTopics(data.detailThread));
  } catch (error) {
    yield put(setDetailTopicsError(error.message));
  }
}

export default function* watchImagesLoad() {
  yield takeEvery(TOPICS.LOAD_DETAIL, handleDetailTopicsLoad);
}
