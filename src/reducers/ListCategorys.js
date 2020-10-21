import { CATEGORY } from '../constants';

const initialState = [];

const ListCategory = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY.SET_ALL_CATEGORY:
      return action.data;

    default:
      return state;
  }
};

export default ListCategory;
