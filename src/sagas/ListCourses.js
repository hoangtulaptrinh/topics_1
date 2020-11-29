import { put, call, takeEvery } from 'redux-saga/effects';

import { COURSES } from '../constants';
import { getAllCourses, createNewCourse, createNewLesson, updateCourseAPI, updateLessonAPI } from '../api';
import { getAllCourses as getAll, setAllCourses } from '../actions';
import { toastSuccess } from '../helper/toastHelper';

export function* handleGetAllCourses() {
  try {
    const response = yield call(getAllCourses); // phải viết call(fetchTopics, idTopics) thay vì call(fetchTopics(idTopics))
    yield put(setAllCourses(response.data.listCourse));
  } catch (error) {
    console.log(error.message);
  }
}

export function* handleCreateNewCourse(action) {
  try {
    yield call(createNewCourse, action.data); // phải viết call(fetchTopics, idTopics) thay vì call(fetchTopics(idTopics))
    yield put(getAll());
    toastSuccess('Thêm khóa học thành công!!!');
  } catch (error) {
    console.log(error.message);
  }
}

export function* handleUpdateCourse(action) {
  try {
    yield call(updateCourseAPI, action.data.id, action.data.data); // phải viết call(fetchTopics, idTopics) thay vì call(fetchTopics(idTopics))
    yield put(getAll());
    toastSuccess('Sửa khóa học thành công!!!');
  } catch (error) {
    console.log(error.message);
  }
}

export function* handleUpdateLesson(action) {
  try {
    yield call(updateLessonAPI, action.data.id, action.data.data); // phải viết call(fetchTopics, idTopics) thay vì call(fetchTopics(idTopics))
    yield put(getAll());
    toastSuccess('Sửa khóa học thành công!!!');
  } catch (error) {
    console.log(error.message);
  }
}

export function* handleCreateNewLesson(action) {
  try {
    yield call(createNewLesson, action.data.id, action.data.data); // phải viết call(fetchTopics, idTopics) thay vì call(fetchTopics(idTopics))
    yield put(getAll());
    toastSuccess('Thêm bài học thành công!!!');
  } catch (error) {
    console.log(error.message);
  }
}

export default function* watchGetAllCourses() {
  yield takeEvery(COURSES.GET_ALL_COURSES, handleGetAllCourses);
  yield takeEvery(COURSES.CREATE_NEW_COURSE, handleCreateNewCourse);
  yield takeEvery(COURSES.UPDATE_COURSES, handleUpdateCourse);
  yield takeEvery(COURSES.UPDATE_LESSON, handleUpdateLesson);
  yield takeEvery(COURSES.CREATE_NEW_LESSON, handleCreateNewLesson);
}
