import { takeEvery, put, call } from 'redux-saga/effects';
import { ADD_CHACKOUT, ADD_CHACKOUT_RED, DELETE_CHACKOUT, DELETE_CHACKOUT_RED, GET_CHACKOUT, GET_CHACKOUT_RED, UPDATE_CHACKOUT, UPDATE_CHACKOUT_RED } from '../Constants';
import { deleteData, getData, recordData, updateData } from './Service/APIcallService';

function* createSagas(action) {
     let response = yield call(recordData, "chackout", action.payload)
     yield put({ type: ADD_CHACKOUT_RED, payload: response })
}

function* getSagas(action) {
     let response = yield call(getData, "chackout")
     yield put({ type: GET_CHACKOUT_RED, payload: response })
}

function* updateSagas(action) {
     yield call(updateData, "chackout", action.payload)
     yield put({ type: UPDATE_CHACKOUT_RED, payload: action.payload })
}

function* deleteSagas(action) {
     yield call(deleteData, "chackout", action.payload)
     yield put({ type: DELETE_CHACKOUT_RED, payload: action.payload })
}

export default function* chackoutSagas() {
     yield takeEvery(ADD_CHACKOUT, createSagas)
     yield takeEvery(GET_CHACKOUT, getSagas)
     yield takeEvery(UPDATE_CHACKOUT, updateSagas)
     yield takeEvery(DELETE_CHACKOUT, deleteSagas)
     // yield takeEvery(ADD_MAINCATEGORY, createSagas)
}





