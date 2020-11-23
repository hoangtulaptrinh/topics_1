import { call, put, takeEvery } from 'redux-saga/effects';

import { updateCurrentUser } from '../api';
import { refreshCurrentUser, reRender } from '../actions';
import { USER } from '../constants';
import { toastSuccess } from '../helper/toastHelper';

export function* handleUpdateUser(action) {
  try {
    yield call(updateCurrentUser, { ...action.data }); // phải viết call(fetchTopics, idTopics) thay vì call(fetchTopics(idTopics))

    yield put(refreshCurrentUser());
    yield put(reRender());

    if (action && action.data && action.data.password) {
      toastSuccess('Đổi Mật Khẩu Thành Công');
      return;
    }

    toastSuccess('Đổi Thông Tin Thành Công');
  } catch (error) {
    console.log(error.message);
  }
}

export default function* watchAddThread() {
  yield takeEvery(USER.UPDATE_CURRENT_USER, handleUpdateUser);
}
