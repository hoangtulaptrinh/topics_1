import { put, call, takeEvery, takeLatest } from 'redux-saga/effects';

import { getAllUser, buyThisCourseService } from '../api';
import { refreshCurrentUser, setAllUsers } from '../actions';
import { toastSuccess, toastWarning } from '../helper/toastHelper';
import { USER } from '../constants';

export function* handleGetAllUsers() {
  try {
    const response = yield call(getAllUser); // phải viết call(fetchTopics, idTopics) thay vì call(fetchTopics(idTopics))
    yield put(setAllUsers(response.data.listUser));
  } catch (error) {
    console.log(error.message);
  }
}

export function* handleBuyThisCourse(action) {
  try {
    const data = {
      idCourse: action.data,
    };
    yield call(buyThisCourseService, data); // phải viết call(fetchTopics, idTopics) thay vì call(fetchTopics(idTopics))
    yield put(refreshCurrentUser());
    toastSuccess('Mua khóa học thành công');
  } catch (error) {
    toastWarning('Bạn Không Đủ Coin Để Mua Khóa Học Này');
    console.log(error.message);
  }
}

export default function* watchGetAllUsers() {
  yield takeEvery(USER.GET_ALL_USERS, handleGetAllUsers);
  yield takeLatest(USER.BUY_THIS_COURSE, handleBuyThisCourse);
}
