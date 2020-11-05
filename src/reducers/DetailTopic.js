import { TOPICS } from '../constants';

const initialState = { loading: false, topic: {}, err: null };

const DetailTopic = (state = initialState, action) => {
  switch (action.type) {
    case TOPICS.LOAD_DETAIL:
      return { ...state, loading: true };

    case TOPICS.LOAD_DETAIL_SUCCESS:
      return { ...state, loading: false, topic: { ...action.topic } };

    case TOPICS.LOAD_DETAIL_FAIL:
      return { ...state, loading: false, err: action.error };

    default:
      return state;
  }
};

export default DetailTopic;
