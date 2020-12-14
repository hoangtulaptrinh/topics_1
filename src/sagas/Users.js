import { put, call, takeEvery, takeLatest, delay } from 'redux-saga/effects';

import { getAllUsers, getAllUsersSuccess, refreshCurrentUser, reRender } from '../actions';
import { getAllUser, buyThisCourseService, updateUser } from '../api';
import { push } from 'connected-react-router';
import { toastSuccess, toastWarning } from '../helper/toastHelper';

import { USER } from '../constants';

export function* handleGetAllUsers() {
  try {
    const response = yield call(getAllUser); // phải viết call(fetchTopics, idTopics) thay vì call(fetchTopics(idTopics))
    yield put(getAllUsersSuccess(response.data.listUser));
  } catch (error) {
    console.log(error.message);
  }
}

export function* handleBuyThisCourse(action) {
  try {
    const data = {
      idCourse: action.data,
    };
    console.log(data);
    yield call(buyThisCourseService, data); // phải viết call(fetchTopics, idTopics) thay vì call(fetchTopics(idTopics))
    yield put(refreshCurrentUser());
    yield put(reRender());

    yield delay(200);
    toastSuccess('Mua khóa học thành công');
    yield put(push(`/learn/${action.data}`));
  } catch (error) {
    toastWarning('Bạn Không Đủ Coin Để Mua Khóa Học Này');
    console.log(error.message);
  }
}

export function* handleAddCoin(action) {
  try {
    const { id, money } = action.data;

    yield call(updateUser, id, { money }); // phải viết call(fetchTopics, idTopics) thay vì call(fetchTopics(idTopics))
    yield put(getAllUsers());
    toastSuccess('Cộng tiền thành công');
  } catch (error) {
    console.log(error.message);
  }
}

export default function* watchGetAllUsers() {
  yield takeEvery(USER.GET_ALL_USERS, handleGetAllUsers);
  yield takeLatest(USER.BUY_THIS_COURSE, handleBuyThisCourse);
  yield takeLatest(USER.UPDATE_USER, handleAddCoin);
}
