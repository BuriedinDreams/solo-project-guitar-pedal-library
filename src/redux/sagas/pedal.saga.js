
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
    console.log('one Pedal', onePedal);
    console.log('onePedal.data', onePedal.data);
    yield put ({type: 'SET_ONE_PEDAL', payload: onePedal.data})
    yield put ({ type: 'FETCH_YOUTUBE_VIDEO', payload: onePedal.data.id })

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


function* updateSaga() {
  yield takeEvery ('UPDATE_PEDAL_PHOTO', PedalPhotoUpdate)
  yield takeEvery ('UPDATE_PEDAL_DESCRIPTION', PedalDescriptionUpdate)
  yield takeEvery ('UPDATE_PEDAL_YOUTUBE', PedalYouTubeUpdate )
}

function* PedalPhotoUpdate(action) {
  console.log('update the photo', action.payload);

  try{
    yield axios.put (`/api/pedal/updatePhoto`,action.payload)

    yield put({
      type: 'FETCH_ONE_PEDAL',
      payload: action.payload
    })

  }
  catch (error) {
    console.log('Saga PUT error in photo', error);
  }
} // 


function* PedalDescriptionUpdate(action) {
  console.log('update the description', action.payload);
  
  try{
    yield axios.put (`/api/pedal/updateDescription`,action.payload)
    
    yield put({
      type: 'FETCH_ONE_PEDAL',
      payload: action.payload
    })
  }
  catch (error) {
    console.log('Saga PUT error in description', error);
  }
}


function* PedalYouTubeUpdate(action) {
  console.log('update the YouTube stuff', action.payload);

  try{
    yield axios.put (`/api/pedal/updateYouTube`,action.payload)

    yield put({
      type: 'FETCH_ONE_PEDAL',
      payload: action.payload
    })
  }
  catch (error) {
    console.log('Saga PUT error in description', error);
  }
}










export { pedalSaga, singlePedalSaga, newPedalInfoSaga, likedBtnSaga, myPedalsSaga, updateSaga };