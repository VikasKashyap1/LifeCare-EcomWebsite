import { takeEvery, put, call } from 'redux-saga/effects';
import { ADD_CART, ADD_CART_RED, DELETE_CART, DELETE_CART_RED, GET_CART, GET_CART_RED, UPDATE_CART, UPDATE_CART_RED } from '../Constants';
import { deleteData, getData, recordData, updateData } from './Service/APIcallService';

function* createSagas(action) {
     let response = yield call (recordData,"cart", action.payload)
     yield put({ type: ADD_CART_RED, payload: response })
}

function* getSagas(action) {
     let response = yield call(getData,"cart")
     yield put({ type: GET_CART_RED, payload: response })
}

function* updateSagas(action) {
     yield call(updateData,"cart", action.payload)
     yield put({ type: UPDATE_CART_RED, payload: action.payload })
}

function* deleteSagas(action) {
     yield call(deleteData,"cart", action.payload)
     yield put({ type: DELETE_CART_RED, payload: action.payload })
}

export default function* cartSagas() {
     yield takeEvery(ADD_CART, createSagas)
     yield takeEvery(GET_CART, getSagas)
     yield takeEvery(UPDATE_CART, updateSagas)
     yield takeEvery(DELETE_CART, deleteSagas)
     // yield takeEvery(ADD_MAINCATEGORY, createSagas)
}








