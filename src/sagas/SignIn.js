import { call, takeLatest } from 'redux-saga/effects';

import { toastSuccess, toastError } from '../helper/toastHelper';

// import { loadTopics } from '../actions';
import { USER } from '../constants';
import { signIn } from '../api';
import history from '../helper/history';

export function* handleSignIn(action) {
  try {
    const response = yield call(signIn, { ...action.data }); // phải viết call(fetchTopics, idTopics) thay vì call(fetchTopics(idTopics))
    localStorage.currentUser = JSON.stringify(response.data.user);
    history.push('/topics');
    toastSuccess('đăng nhập thành công');
  } catch (error) {
    toastError('đăng nhập thất bại');
    console.log(error.message);
  }
}

export default function* watchSignIn() {
  yield takeLatest(USER.SIGN_IN, handleSignIn);
}
