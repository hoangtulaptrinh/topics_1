import { put, call, takeEvery } from 'redux-saga/effects';

import { getAllUser } from '../api';
import { setAllUsers } from '../actions';
import { USER } from '../constants';

export function* handleGetAllUsers() {
  try {
    const response = yield call(getAllUser); // phải viết call(fetchTopics, idTopics) thay vì call(fetchTopics(idTopics))
    yield put(setAllUsers(response.data.listUser));
  } catch (error) {
    console.log(error.message);
  }
}

export default function* watchGetAllUsers() {
  yield takeEvery(USER.GET_ALL_USERS, handleGetAllUsers);
}
