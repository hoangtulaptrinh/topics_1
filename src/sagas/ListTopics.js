import { put, call, takeEvery } from 'redux-saga/effects';

import { setTopics, setTopicsError } from '../actions';
import { TOPICS } from '../constants';
import { fetchTopics } from '../api';

export function* handleTopicsLoad() {
  const query = new URLSearchParams(window.location.search);

  const idTopics = query.get('idThread');

  try {
    const data = yield call(fetchTopics, idTopics); // phải viết call(fetchTopics, idTopics) thay vì call(fetchTopics(idTopics))
    yield put(setTopics(data.listTopic));
  } catch (error) {
    yield put(setTopicsError(error.message));
  }
}

export default function* watchImagesLoad() {
  yield takeEvery(TOPICS.LOAD, handleTopicsLoad);
}
