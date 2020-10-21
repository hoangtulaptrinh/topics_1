import { put, call, takeEvery } from 'redux-saga/effects';

import { CATEGORY } from '../constants';
import { getAllCategory } from '../api';
import { setAllCategory } from '../actions';

export function* handleGetAllCategory() {
  try {
    const response = yield call(getAllCategory); // phải viết call(fetchTopics, idTopics) thay vì call(fetchTopics(idTopics))
    yield put(setAllCategory(response.data.listCategory));
  } catch (error) {
    console.log(error.message);
  }
}

export default function* watchGetAllCategory() {
  yield takeEvery(CATEGORY.GET_ALL_CATEGORY, handleGetAllCategory);
}
