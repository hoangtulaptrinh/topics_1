import axios from 'axios';

const SEVER_URL = 'http://localhost:5000';

const currentUser = JSON.parse(localStorage.getItem('currentUser'));

export const getAllUser = () => axios.get(`${SEVER_URL}/users`);

export const getDetailUser = () => axios.get(`${SEVER_URL}/users/${currentUser._id}`);

export const updateCurrentUser = data => axios.put(`${SEVER_URL}/users/update_info/${currentUser._id}`, data);

export const updateUser = (id, data) => axios.put(`${SEVER_URL}/users/update_info/${id}`, data);

export const signIn = data => axios.post(`${SEVER_URL}/users/login`, data);

export const signUp = data => axios.post(`${SEVER_URL}/users/create`, data);

export const buyThisCourseService = data => axios.patch(`${SEVER_URL}/users/buy_course/${currentUser._id}`, data);

export const getAllCourses = () => axios.get(`${SEVER_URL}/courses`);

export const createNewCourse = data => axios.post(`${SEVER_URL}/courses/create`, data);

export const getAllCategory = () => axios.get(`${SEVER_URL}/categorys`);

export const fetchTopics = async id => {
  const response = await fetch(`${SEVER_URL}/topics/show_all_threads_on_topic/${id}`);
  const data = await response.json();

  if (response.status >= 400) {
    if (response.status === 404) throw new Error('không tìm thấy');
    // throw new Error('đã xảy ra lỗi');
    throw new Error('');
  }
  return data;
};

export const fetchDetailTopics = async (idThread, id) => {
  const response = await fetch(`${SEVER_URL}/topics/${idThread}?id=${id}`);
  const data = await response.json();

  if (response.status >= 400) {
    if (response.status === 404) throw new Error('không tìm thấy');
    // throw new Error('đã xảy ra lỗi');
    throw new Error('');
  }
  return data;
};

export const addComment = (data, id) => {
  const obj = new FormData();

  obj.append('id_author_comment', data.id_author_comment);
  obj.append('id_thread', data.id_thread);
  obj.append('content', data.content);
  data.image && obj.append('image', data.image);
  data.video && obj.append('video', data.video);
  data.outline && obj.append('outline', data.outline);

  return axios.patch(`${SEVER_URL}/topics/add_comment/${id}`, obj);
};

export const addThread = (data, id) => {
  const obj = new FormData();

  obj.append('id_author', data.id_author);
  obj.append('content', data.content);
  data.image && obj.append('image', data.image);
  data.video && obj.append('video', data.video);
  data.outline && obj.append('outline', data.outline);

  return axios.post(`${SEVER_URL}/topics/create/${id}`, obj);
};
