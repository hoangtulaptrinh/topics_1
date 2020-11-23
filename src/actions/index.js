import { USER, COURSES, TOPICS, HELPER, CATEGORY } from '../constants';

export const getAllUsers = () => ({
  type: USER.GET_ALL_USERS,
});

export const getAllUsersSuccess = data => ({
  type: USER.GET_ALL_USERS_SUCCESS,
  payload: data,
});

export const getAllUsersFail = err => ({
  type: USER.GET_ALL_USERS_FAIL,
  err,
});

export const updateCurrentUser = data => ({
  type: USER.UPDATE_CURRENT_USER,
  data,
});

export const updateUser = data => ({
  type: USER.UPDATE_USER,
  data,
});

export const updateProcessCourse = data => ({
  type: USER.UPDATE_PROCESS_COURSE,
  data,
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

export const buyThisCourse = data => ({
  type: USER.BUY_THIS_COURSE,
  data,
});

export const refreshCurrentUser = () => ({
  type: USER.REFRESH_CURRENT_USER,
});

export const getAllCourses = () => ({
  type: COURSES.GET_ALL_COURSES,
});

export const setAllCourses = data => ({
  type: COURSES.SET_ALL_COURSES,
  data,
});

export const createNewCourse = data => ({
  type: COURSES.CREATE_NEW_COURSE,
  data,
});

export const createNewLesson = data => ({
  type: COURSES.CREATE_NEW_LESSON,
  data,
});

export const getAllCategory = () => ({
  type: CATEGORY.GET_ALL_CATEGORY,
});

export const setAllCategory = data => ({
  type: CATEGORY.SET_ALL_CATEGORY,
  data,
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

export const loadDetailTopics = () => ({
  type: TOPICS.LOAD_DETAIL,
});

export const setDetailTopics = topic => ({
  type: TOPICS.LOAD_DETAIL_SUCCESS,
  topic,
});

export const setDetailTopicsError = error => ({
  type: TOPICS.LOAD_DETAIL_FAIL,
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
