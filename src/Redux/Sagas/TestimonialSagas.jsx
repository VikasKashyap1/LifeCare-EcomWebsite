import { takeEvery, put, call } from 'redux-saga/effects';
import { ADD_TESTIMONIAL, ADD_TESTIMONIAL_RED, DELETE_TESTIMONIAL, DELETE_TESTIMONIAL_RED, GET_TESTIMONIAL, GET_TESTIMONIAL_RED, UPDATE_TESTIMONIAL, UPDATE_TESTIMONIAL_RED } from '../Constants';
import { deleteData, getData, recordData, updateData } from './Service/APIcallService';

function* createSagas(action) {
     let response = yield call (recordData,"testimonial", action.payload)
     yield put({ type: ADD_TESTIMONIAL_RED, payload: response })
}

function* getSagas(action) {
     let response = yield call(getData,"testimonial")
     yield put({ type: GET_TESTIMONIAL_RED, payload: response })
}

function* updateSagas(action) {
     yield call(updateData,"testimonial", action.payload)
     yield put({ type: UPDATE_TESTIMONIAL_RED, payload: action.payload })
}

function* deleteSagas(action) {
     yield call(deleteData,"testimonial", action.payload)
     yield put({ type: DELETE_TESTIMONIAL_RED, payload: action.payload })
}

export default function* testimonialSagas() {
     yield takeEvery(ADD_TESTIMONIAL, createSagas)
     yield takeEvery(GET_TESTIMONIAL, getSagas)
     yield takeEvery(UPDATE_TESTIMONIAL, updateSagas)
     yield takeEvery(DELETE_TESTIMONIAL, deleteSagas)
     // yield takeEvery(ADD_MAINCATEGORY, createSagas)
}








