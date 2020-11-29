import { put, call, takeEvery } from 'redux-saga/effects';

import { CATEGORY } from '../constants';
import { getAllCategory, updateCateoryAPI, createCategoryAPI } from '../api';
import { getAllCategory as getAllCategoryAction, setAllCategory } from '../actions';
import { toastSuccess } from '../helper/toastHelper';

export function* handleGetAllCategory() {
  try {
    const response = yield call(getAllCategory); // phải viết call(fetchTopics, idTopics) thay vì call(fetchTopics(idTopics))
    yield put(setAllCategory(response.data.listCategory));
  } catch (error) {
    console.log(error.message);
  }
}

export function* handleCreateNewCategory(action) {
  try {
    yield call(createCategoryAPI, action.data); // phải viết call(fetchTopics, idTopics) thay vì call(fetchTopics(idTopics))
    yield put(getAllCategoryAction());
    toastSuccess('Thêm danh mục thành công!!!');
  } catch (error) {
    console.log(error.message);
  }
}

export function* handleUpdateCategory(action) {
  try {
    yield call(updateCateoryAPI, action.data.id, action.data.data); // phải viết call(fetchTopics, idTopics) thay vì call(fetchTopics(idTopics))
    yield put(getAllCategoryAction());
    toastSuccess('Sửa danh mục thành công!!!');
  } catch (error) {
    console.log(error.message);
  }
}

export default function* watchGetAllCategory() {
  yield takeEvery(CATEGORY.GET_ALL_CATEGORY, handleGetAllCategory);
  yield takeEvery(CATEGORY.UPDATE_CATEGORY, handleUpdateCategory);
  yield takeEvery(CATEGORY.CREATE_CATEGORY, handleCreateNewCategory);
}
