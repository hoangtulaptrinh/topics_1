import { all } from "redux-saga/effects";

import ListTopics from "./ListTopics";
import AddComment from "./AddComment";
import AddThread from "./AddThread";

export default function* rootSaga() {
  yield all([ListTopics(), AddComment(), AddThread()]);
}
