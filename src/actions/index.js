import { TOPICS } from "../constants";

export const loadTopics = () => ({
  type: TOPICS.LOAD
});

export const setTopics = (topics) => ({
  type: TOPICS.LOAD_SUCCESS,
  topics
});

export const setTopicsError = (error) => ({
  type: TOPICS.LOAD_FAIL,
  error
});
