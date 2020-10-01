import { TOPICS } from "../constants";

export const loadTopics = () => ({
  type: TOPICS.LOAD,
});

export const setTopics = (topics) => ({
  type: TOPICS.LOAD_SUCCESS,
  topics,
});

export const setTopicsError = (error) => ({
  type: TOPICS.LOAD_FAIL,
  error,
});

export const addThread = (data) => ({
  type: TOPICS.ADD_THREAD,
  data,
});

export const addComment = (data) => ({
  type: TOPICS.ADD_COMMENT,
  data,
});
