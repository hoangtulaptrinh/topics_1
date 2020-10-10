import { call, takeEvery } from 'redux-saga/effects';

import { TOPICS } from '../constants';
import { careTopics } from '../api';

export function* handleCareTopics(action) {
  yield console.log(action.data);
  // try {
  //   yield call(careTopics, { ...action.data }); // phải viết call(fetchTopics, idTopics) thay vì call(fetchTopics(idTopics))
  //   yield put(loadTopics());
  // } catch (error) {
  //   console.log(error.message);
  // }
}

export default function* watchAddThread() {
  yield takeEvery(TOPICS.CARE_TOPICS, handleCareTopics);
}
