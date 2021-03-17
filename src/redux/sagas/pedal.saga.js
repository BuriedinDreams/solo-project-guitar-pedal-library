
import { put, takeEvery, takeLatest } from '@redux-saga/core/effects';
import axios from 'axios';

function* fetchPedal(){

  try{
    const pedals = yield axios.get('/api/pedal');
    console.log('get photo of pedals', pedals.data); // I don't recall how we get the parameter name
    yield put({ type: 'SET_PEDALS', payload: pedals.data });
  } catch {
    console.log('Error in FetchPedal SAGA');
  }

}



function* pedalSaga() {
  yield takeEvery('FETCH_PEDALS', fetchPedal);
  
}


export default pedalSaga;