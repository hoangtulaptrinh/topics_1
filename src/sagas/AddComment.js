import { put, call, takeEvery } from 'redux-saga/effects';

import { loadTopics } from '../actions';
import { TOPICS } from '../constants';
import { addComment } from '../api';

export function* handleAddComment(action) {
  const query = new URLSearchParams(window.location.search);

  const idTopics = query.get('idThread');

  try {
    yield call(addComment, { ...action.data }, idTopics); // phải viết call(fetchTopics, idTopics) thay vì call(fetchTopics(idTopics))
    yield put(loadTopics());
  } catch (error) {
    console.log(error.message);
  }
}

export default function* watchAddComment() {
  yield takeEvery(TOPICS.ADD_COMMENT, handleAddComment);
}
