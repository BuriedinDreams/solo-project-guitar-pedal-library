
import { takeEvery, takeLatest } from '@redux-saga/core/effects';
import axios from 'axios';

function* fetchPedal(){






}

















function* pedalSaga() {
  yield takeEvery('FETCH_PEDALS', fetchPedal);
  
}


export default pedalSaga;