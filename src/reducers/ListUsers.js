import { USER } from '../constants';

const initialState = {
  listUsers: []
};

const ListTopics = (state = initialState, action) => {
  switch (action.type) {
    case USER.SET_ALL_USERS:
      return action.data;

    case USER.GET_ALL_USERS:
      return { ...state };

    case USER.GET_ALL_USERS_SUCCESS:
      return { ...state, listUsers: action.payload };

    case USER.GET_ALL_USERS_FAIL:
      return { ...state };

    default:
      return state;
  }
};

export default ListTopics;
