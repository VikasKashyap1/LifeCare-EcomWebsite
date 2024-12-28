import { takeEvery, put, call } from 'redux-saga/effects';
import { ADD_CONTACT_US, ADD_CONTACT_US_RED, DELETE_CONTACT_US, DELETE_CONTACT_US_RED, GET_CONTACT_US, GET_CONTACT_US_RED, UPDATE_CONTACT_US, UPDATE_CONTACT_US_RED } from '../Constants';
import { deleteData, getData, recordData, updateData } from './Service/APIcallService';

function* createSagas(action) {
     let response = yield call(recordData, "contactus", action.payload)
     yield put({ type: ADD_CONTACT_US_RED, payload: response })
}

function* getSagas(action) {
     let response = yield call(getData, "contactus")
     yield put({ type: GET_CONTACT_US_RED, payload: response })
}

function* updateSagas(action) {
     yield call(updateData, "contactus", action.payload)
     yield put({ type: UPDATE_CONTACT_US_RED, payload: action.payload })
}

function* deleteSagas(action) {
     yield call(deleteData, "contactus", action.payload)
     yield put({ type: DELETE_CONTACT_US_RED, payload: action.payload })
}

export default function* contactUsSagas() {
     yield takeEvery(ADD_CONTACT_US, createSagas)
     yield takeEvery(GET_CONTACT_US, getSagas)
     yield takeEvery(UPDATE_CONTACT_US, updateSagas)
     yield takeEvery(DELETE_CONTACT_US, deleteSagas)
     // yield takeEvery(ADD_MAINCATEGORY, createSagas)
}








