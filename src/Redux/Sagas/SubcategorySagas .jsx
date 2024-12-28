import { takeEvery, put, call } from 'redux-saga/effects';
import { ADD_SUBCATEGORY, ADD_SUBCATEGORY_RED, DELETE_SUBCATEGORY, DELETE_SUBCATEGORY_RED, GET_SUBCATEGORY, GET_SUBCATEGORY_RED, UPDATE_SUBCATEGORY, UPDATE_SUBCATEGORY_RED } from '../Constants';
import { deleteData, getData, recordData, updateData } from './Service/APIcallService';

function* createSagas(action) {
     let response = yield call (recordData,"subcategory", action.payload)
     yield put({ type: ADD_SUBCATEGORY_RED, payload: response })
}

function* getSagas(action) {
     let response = yield call(getData,"subcategory")
     yield put({ type: GET_SUBCATEGORY_RED, payload: response })
}

function* updateSagas(action) {
     yield call(updateData,"subcategory", action.payload)
     yield put({ type: UPDATE_SUBCATEGORY_RED, payload: action.payload })
}

function* deleteSagas(action) {
     yield call(deleteData,"subcategory", action.payload)
     yield put({ type: DELETE_SUBCATEGORY_RED, payload: action.payload })
}

export default function* subcategorySagas() {
     yield takeEvery(ADD_SUBCATEGORY, createSagas)
     yield takeEvery(GET_SUBCATEGORY, getSagas)
     yield takeEvery(UPDATE_SUBCATEGORY, updateSagas)
     yield takeEvery(DELETE_SUBCATEGORY, deleteSagas)
     // yield takeEvery(ADD_SUBCATEGORY, createSagas)
}








