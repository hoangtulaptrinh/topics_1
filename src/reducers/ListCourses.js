import { COURSES } from '../constants';

const initialState = [];

const ListCourses = (state = initialState, action) => {
  switch (action.type) {
    case COURSES.SET_ALL_COURSES:
      return action.data;

    default:
      return state;
  }
};

export default ListCourses;
