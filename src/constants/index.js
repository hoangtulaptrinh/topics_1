const USER = {
  GET_ALL_USERS: 'GET_ALL_USERS',
  GET_ALL_USERS_SUCCESS: 'GET_ALL_USERS_SUCCESS',
  GET_ALL_USERS_FAIL: 'GET_ALL_USERS_FAIL',

  SET_ALL_USERS: 'SET_ALL_USERS',
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
  BUY_THIS_COURSE: 'BUY_THIS_COURSE',
  REFRESH_CURRENT_USER: 'REFRESH_CURRENT_USER',
};

const CATEGORY = {
  GET_ALL_CATEGORY: 'GET_ALL_CATEGORY',
  SET_ALL_CATEGORY: 'SET_ALL_CATEGORY',
};

const COURSES = {
  GET_ALL_COURSES: 'GET_ALL_COURSES',
  SET_ALL_COURSES: 'SET_ALL_COURSES',
};

const TOPICS = {
  LOAD: 'TOPICS_LOAD',
  LOAD_SUCCESS: 'TOPICS_LOAD_SUCCESS',
  LOAD_FAIL: 'TOPICS_LOAD_FAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  ADD_THREAD: 'ADD_THREAD',
  CARE_TOPICS: 'CARE_TOPICS',
  LOAD_DETAIL: 'DETAIL_TOPICS_LOAD',
  LOAD_DETAIL_SUCCESS: 'DETAIL_TOPICS_LOAD_SUCCESS',
  LOAD_DETAIL_FAIL: 'DETAIL_TOPICS_LOAD_FAIL',
};

const HELPER = {
  RE_RENDER: 'RE_RENDER',
};

export { USER, CATEGORY, COURSES, TOPICS, HELPER };
