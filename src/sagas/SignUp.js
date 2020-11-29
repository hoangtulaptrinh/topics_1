import { call, takeLatest } from 'redux-saga/effects';

import { toastSuccess, toastError } from '../helper/toastHelper';

import { USER } from '../constants';
import { signUp } from '../api';

export function* handleSignUp(action) {
  try {
    yield call(signUp, { ...action.data }); // phải viết call(fetchTopics, idTopics) thay vì call(fetchTopics(idTopics))
    toastSuccess('đăng ký thành công');
  } catch (error) {
    toastError('đăng ký thất bại');
    console.log(error.message);
  }
}

export default function* watchSignUp() {
  yield takeLatest(USER.SIGN_UP, handleSignUp);
}
