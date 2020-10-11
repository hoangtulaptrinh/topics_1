import { HELPER } from '../constants';

const initialState = false;

const ReRender = (state = initialState, action) => {
  switch (action.type) {
    case HELPER.RE_RENDER:
      return !state;

    default:
      return state;
  }
};

export default ReRender;
