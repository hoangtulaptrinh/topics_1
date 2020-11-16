import { call, put, takeEvery } from 'redux-saga/effects';

import { updateCurrentUser } from '../api';
import { refreshCurrentUser } from '../actions';
import { USER } from '../constants';
import { toastSuccess } from '../helper/toastHelper';

export function* handleUpdateUser(action) {
  try {
    console.log(1111);
    yield call(updateCurrentUser, { ...action.data }); // phải viết call(fetchTopics, idTopics) thay vì call(fetchTopics(idTopics))

    yield put(refreshCurrentUser());
    console.log(action);

    if (action && action.data && action.data.password) {
      toastSuccess('Đổi Mật Khẩu Thành Công');
      return;
    }
  } catch (error) {
    console.log(error.message);
  }
}

export default function* watchAddThread() {
  yield takeEvery(USER.UPDATE_CURRENT_USER, handleUpdateUser);
}
