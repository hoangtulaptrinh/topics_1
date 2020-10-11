import { HELPER, TOPICS, USER } from '../constants';

export const getAllUsers = () => ({
  type: USER.GET_ALL_USERS,
});

export const setAllUsers = data => ({
  type: USER.SET_ALL_USERS,
  data,
});

export const signIn = data => ({
  type: USER.SIGN_IN,
  data,
});

export const signUp = data => ({
  type: USER.SIGN_UP,
  data,
});

export const refreshCurrentUser = () => ({
  type: USER.REFRESH_CURRENT_USER,
});

export const careTopics = data => ({
  type: TOPICS.CARE_TOPICS,
  data,
});

export const loadTopics = () => ({
  type: TOPICS.LOAD,
});

export const setTopics = topics => ({
  type: TOPICS.LOAD_SUCCESS,
  topics,
});

export const setTopicsError = error => ({
  type: TOPICS.LOAD_FAIL,
  error,
});

export const addThread = data => ({
  type: TOPICS.ADD_THREAD,
  data,
});

export const addComment = data => ({
  type: TOPICS.ADD_COMMENT,
  data,
});

export const reRender = () => ({
  type: HELPER.RE_RENDER,
});
