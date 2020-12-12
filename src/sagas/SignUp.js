import { call, put, takeLatest } from 'redux-saga/effects';

import { toastError } from '../helper/toastHelper';

import { USER } from '../constants';
import { signUp } from '../api';
import { signIn } from '../actions';

export function* handleSignUp(action) {
  try {
    const response = yield call(signUp, { ...action.data }); // phải viết call(fetchTopics, idTopics) thay vì call(fetchTopics(idTopics))
    yield put(signIn({ email: response.data.newUser.email, password: response.data.newUser.password }));
  } catch (error) {
    toastError('đăng ký tài khoản thất bại');
    console.log(error.message);
  }
}

export default function* watchSignUp() {
  yield takeLatest(USER.SIGN_UP, handleSignUp);
}
