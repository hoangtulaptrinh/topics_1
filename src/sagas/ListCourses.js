import { put, call, takeEvery } from 'redux-saga/effects';

import { COURSES } from '../constants';
import { getAllCourses } from '../api';
import { setAllCourses } from '../actions';

export function* handleGetAllCourses() {
  try {
    const response = yield call(getAllCourses); // phải viết call(fetchTopics, idTopics) thay vì call(fetchTopics(idTopics))
    yield put(setAllCourses(response.data.listCourse));
  } catch (error) {
    console.log(error.message);
  }
}

export default function* watchGetAllCourses() {
  yield takeEvery(COURSES.GET_ALL_COURSES, handleGetAllCourses);
}
