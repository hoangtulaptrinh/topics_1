import { all } from "redux-saga/effects";

import ListTopics from "./ListTopics";

export default function* rootSaga() {
  yield all([ListTopics()]);
}
