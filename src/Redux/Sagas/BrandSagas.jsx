import { takeEvery, put, call } from 'redux-saga/effects';
import { ADD_BRAND, ADD_BRAND_RED, DELETE_BRAND, DELETE_BRAND_RED, GET_BRAND, GET_BRAND_RED, UPDATE_BRAND, UPDATE_BRAND_RED } from '../Constants';
import { deleteData, getData, recordData, updateData } from './Service/APIcallService';

function* createSagas(action) {
     let response = yield call (recordData,"brand", action.payload)
     yield put({ type: ADD_BRAND_RED, payload: response })
}

function* getSagas(action) {
     let response = yield call(getData,"brand")
     yield put({ type: GET_BRAND_RED, payload: response })
}

function* updateSagas(action) {
     yield call(updateData,"brand", action.payload)
     yield put({ type: UPDATE_BRAND_RED, payload: action.payload })
}

function* deleteSagas(action) {
     yield call(deleteData,"brand", action.payload)
     yield put({ type: DELETE_BRAND_RED, payload: action.payload })
}

export default function* brandSagas() {
     yield takeEvery(ADD_BRAND, createSagas)
     yield takeEvery(GET_BRAND, getSagas)
     yield takeEvery(UPDATE_BRAND, updateSagas)
     yield takeEvery(DELETE_BRAND, deleteSagas)
     // yield takeEvery(ADD_MAINCATEGORY, createSagas)
}








