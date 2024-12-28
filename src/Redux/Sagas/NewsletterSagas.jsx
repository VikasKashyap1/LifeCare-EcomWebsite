import { takeEvery, put, call } from 'redux-saga/effects';
import { ADD_NEWSLETTER, ADD_NEWSLETTER_RED, DELETE_NEWSLETTER, DELETE_NEWSLETTER_RED, GET_NEWSLETTER, GET_NEWSLETTER_RED, UPDATE_NEWSLETTER, UPDATE_NEWSLETTER_RED } from '../Constants';
import { deleteData, getData, recordData, updateData } from './Service/APIcallService';

function* createSagas(action) {
     let response = yield call (recordData,"newsletter", action.payload)
     yield put({ type: ADD_NEWSLETTER_RED, payload: response })
}

function* getSagas(action) {
     let response = yield call(getData,"newsletter")
     yield put({ type: GET_NEWSLETTER_RED, payload: response })
}

function* updateSagas(action) {
     yield call(updateData,"newsletter", action.payload)
     yield put({ type: UPDATE_NEWSLETTER_RED, payload: action.payload })
}

function* deleteSagas(action) {
     yield call(deleteData,"newsletter", action.payload)
     yield put({ type: DELETE_NEWSLETTER_RED, payload: action.payload })
}

export default function* newsletterSagas() {
     yield takeEvery(ADD_NEWSLETTER, createSagas)
     yield takeEvery(GET_NEWSLETTER, getSagas)
     yield takeEvery(UPDATE_NEWSLETTER, updateSagas)
     yield takeEvery(DELETE_NEWSLETTER, deleteSagas)
     // yield takeEvery(ADD_MAINCATEGORY, createSagas)
}








