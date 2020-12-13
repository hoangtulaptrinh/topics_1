import { put, call, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { toastSuccess, toastError } from '../helper/toastHelper';

// import { loadTopics } from '../actions';
import { USER } from '../constants';
import { signIn } from '../api';

export function* handleSignIn(action) {
  try {
    const response = yield call(signIn, { ...action.data }); // phải viết call(fetchTopics, idTopics) thay vì call(fetchTopics(idTopics))
    localStorage.currentUser = JSON.stringify(response.data.user);
    console.log(response.data.user);
    toastSuccess('đăng nhập thành công');
    if (response.data.user.role === 'admin') {
      yield put(push('/admin'));
      return;
    }

    yield put(push('/'));
  } catch (error) {
    toastError('đăng nhập thất bại');
    console.log(error.message);
  }
}

export default function* watchSignIn() {
  yield takeLatest(USER.SIGN_IN, handleSignIn);
}
