
import { put, takeEvery, takeLatest } from '@redux-saga/core/effects';
import axios from 'axios';

function* pedalSaga() {
  yield takeEvery('FETCH_PEDALS', fetchPedal);
  
} // end of pedalSaga dispatcher.

function* fetchPedal(){

  try{
    const pedals = yield axios.get('/api/pedal');
    console.log('get photo of pedals', pedals.data); 
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
    const onePedal = yield axios.get(`/api/pedal/onePedal/${action.payload.id}`) 
    yield put ({type: 'SET_ONE_PEDAL', payload: onePedal.data})

  } catch(error){
    console.log('Error in FetchOnePedal',error)
  }

} // end of FetchOnePedalSaga



function* newPedalInfoSaga() {
  yield takeEvery('SEND_PEDAL_INFO', newPedalPost )
}

function* newPedalPost(action) {
  console.log('see what is in the pay.load', action.payload);
  try{
    yield axios.post(`/api/pedal`, action.payload)

    yield put({
      type: 'FETCH_PEDALS'
    })

  } catch {
    console.log('Error inside newPedalInfoSaga: pedal.saga');
  }
} // end of newPedalInfoSaga



function* likedBtnSaga() {
  yield takeEvery('ADD_LIKE', createLikeSaga);
}

function* createLikeSaga(action) {
  console.log('See what info is being passed', action.payload);
  try{
    yield axios.post(`/api/pedal/likes`, action.payload)

    yield put({
      type: 'FETCH_PEDALS'
    })

  } catch {
    console.log('Error inside createLikeSaga: pedal.saga');
  }
} // end of newPedalInfoSaga


function* myPedalsSaga() {
  yield takeEvery('FETCH_USERS_PEDALS', fetchUsersPedal);
  
} // end of pedalSaga dispatcher.

function* fetchUsersPedal(){
console.log('Fetching users pedals');
  try{
    const pedals = yield axios.get('/api/pedal/myPedals');
    console.log('get photo of pedals', pedals.data); 
    yield put({ type: 'SET_USERS_PEDALS', payload: pedals.data });
  } catch {
    console.log('Error in FetchPedal SAGA');
  }

} // end of fetchPedal Saga





export { pedalSaga, singlePedalSaga, newPedalInfoSaga, likedBtnSaga, myPedalsSaga  };