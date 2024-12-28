import { takeEvery, put, call } from 'redux-saga/effects';
import { ADD_WISHLIST, ADD_WISHLIST_RED, DELETE_WISHLIST, DELETE_WISHLIST_RED, GET_WISHLIST, GET_WISHLIST_RED, UPDATE_WISHLIST, UPDATE_WISHLIST_RED } from '../Constants';
import { deleteData, getData, recordData, updateData } from './Service/APIcallService';

function* createSagas(action) {
     let response = yield call (recordData,"wishlist", action.payload)
     yield put({ type: ADD_WISHLIST_RED, payload: response })
}

function* getSagas(action) {
     let response = yield call(getData,"wishlist")
     yield put({ type: GET_WISHLIST_RED, payload: response })
}

function* updateSagas(action) {
     yield call(updateData,"wishlist", action.payload)
     yield put({ type: UPDATE_WISHLIST_RED, payload: action.payload })
}

function* deleteSagas(action) {
     yield call(deleteData,"wishlist", action.payload)
     yield put({ type: DELETE_WISHLIST_RED, payload: action.payload })
}

export default function* wishlistSagas() {
     yield takeEvery(ADD_WISHLIST, createSagas)
     yield takeEvery(GET_WISHLIST, getSagas)
     yield takeEvery(UPDATE_WISHLIST, updateSagas)
     yield takeEvery(DELETE_WISHLIST, deleteSagas)
     // yield takeEvery(ADD_MAINCATEGORY, createSagas)
}








