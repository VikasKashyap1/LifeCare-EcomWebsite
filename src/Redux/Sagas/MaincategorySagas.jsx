import { takeEvery, put, call } from 'redux-saga/effects';
import { ADD_MAINCATEGORY, ADD_MAINCATEGORY_RED, DELETE_MAINCATEGORY, DELETE_MAINCATEGORY_RED, GET_MAINCATEGORY, GET_MAINCATEGORY_RED, UPDATE_MAINCATEGORY, UPDATE_MAINCATEGORY_RED } from '../Constants';
import { deleteData, getData, recordData, updateData } from './Service/APIcallService';

function* createSagas(action) {
     let response = yield call (recordData,"maincategory", action.payload)
     yield put({ type: ADD_MAINCATEGORY_RED, payload: response })
}

function* getSagas(action) {
     let response = yield call(getData,"maincategory")
     yield put({ type: GET_MAINCATEGORY_RED, payload: response })
}

function* updateSagas(action) {
     yield call(updateData,"maincategory", action.payload)
     yield put({ type: UPDATE_MAINCATEGORY_RED, payload: action.payload })
}

function* deleteSagas(action) {
     yield call(deleteData,"maincategory", action.payload)
     yield put({ type: DELETE_MAINCATEGORY_RED, payload: action.payload })
}

export default function* maincategorySagas() {
     yield takeEvery(ADD_MAINCATEGORY, createSagas)
     yield takeEvery(GET_MAINCATEGORY, getSagas)
     yield takeEvery(UPDATE_MAINCATEGORY, updateSagas)
     yield takeEvery(DELETE_MAINCATEGORY, deleteSagas)
     // yield takeEvery(ADD_MAINCATEGORY, createSagas)
}








