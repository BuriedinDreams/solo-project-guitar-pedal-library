
import { put, takeEvery, takeLatest } from '@redux-saga/core/effects';
import axios from 'axios';

function* pedalSaga() {
  yield takeEvery('FETCH_PEDALS', fetchPedal);
  
} // end of pedalSaga dispatcher.

function* fetchPedal(){

  try{
    const pedals = yield axios.get('/api/pedal');
    console.log('get photo of pedals', pedals.data); // I don't recall how we get the parameter name
    yield put({ type: 'SET_PEDALS', payload: pedals.data });
  } catch {
    console.log('Error in FetchPedal SAGA');
  }

} // end of fetchPedal Saga


function* singlePedalSaga() {
  yield takeEvery('FETCH_ONE_PEDAL',fetchOnePedal );
} // end of singlePedalSaga

function* fetchOnePedal(action) {
  try{
    const onePedal = yield axios.get(`/api/pedal/${action.payload.id}`) 
    yield put ({type: 'SET_ONE_PEDAL', payload: onePedal.data})

  } catch{
    console.log('Error in FetchOnePedal')
  }

} // end of FetchOnePedalSaga






export { pedalSaga, singlePedalSaga, };