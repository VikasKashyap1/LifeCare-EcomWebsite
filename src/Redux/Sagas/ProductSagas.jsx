import { takeEvery, put, call } from 'redux-saga/effects';
import { ADD_PRODUCT, ADD_PRODUCT_RED, DELETE_PRODUCT, DELETE_PRODUCT_RED, GET_PRODUCT, GET_PRODUCT_RED, UPDATE_PRODUCT, UPDATE_PRODUCT_RED } from '../Constants';
import { deleteData, getData, recordData, updateData } from './Service/APIcallService';

function* createSagas(action) {
     let response = yield call(recordData, "product", action.payload)
     yield put({ type: ADD_PRODUCT_RED, payload: response })
}

function* getSagas(action) {
     let response = yield call(getData, "product")
     yield put({ type: GET_PRODUCT_RED, payload: response })
}

function* updateSagas(action) {
     yield call(updateData, "product", action.payload)
     yield put({ type: UPDATE_PRODUCT_RED, payload: action.payload })
}

function* deleteSagas(action) {
     yield call(deleteData, "product", action.payload)
     yield put({ type: DELETE_PRODUCT_RED, payload: action.payload })
}

export default function* productSagas() {
     yield takeEvery(ADD_PRODUCT, createSagas)
     yield takeEvery(GET_PRODUCT, getSagas)
     yield takeEvery(UPDATE_PRODUCT, updateSagas)
     yield takeEvery(DELETE_PRODUCT, deleteSagas)
     // yield takeEvery(ADD_MAINCATEGORY, createSagas)
}








