import { put, call, takeEvery } from "redux-saga/effects";

import { loadTopics } from "../actions";
import { TOPICS } from "../constants";
import { addComment } from "../api";

export function* handleAddComment(action) {
  const idTopics = window.location.pathname.split("/")[
    window.location.pathname.split("/").length - 1
  ];

  try {
    yield call(addComment, { ...action.data }, idTopics); // phải viết call(fetchTopics, idTopics) thay vì call(fetchTopics(idTopics))
    yield put(loadTopics());
  } catch (error) {
    console.log(error.message);
  }
}

export default function* watchAddComment() {
  yield takeEvery(TOPICS.ADD_COMMENT, handleAddComment);
}
