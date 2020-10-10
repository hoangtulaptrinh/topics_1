import { USER } from '../constants';

const initialState = [];

const ListTopics = (state = initialState, action) => {
  switch (action.type) {
    case USER.SET_ALL_USERS:
      return action.data;

    default:
      return state;
  }
};

export default ListTopics;
