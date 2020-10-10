import { TOPICS } from '../constants';

const initialState = { loading: false, listTopics: {}, err: null };

const ListTopics = (state = initialState, action) => {
  switch (action.type) {
    case TOPICS.LOAD:
      return { ...state, loading: true };

    case TOPICS.LOAD_SUCCESS:
      return { ...state, loading: false, listTopics: { ...action.topics } };

    case TOPICS.LOAD_FAIL:
      return { ...state, loading: false, err: action.error };

    default:
      return state;
  }
};

export default ListTopics;
