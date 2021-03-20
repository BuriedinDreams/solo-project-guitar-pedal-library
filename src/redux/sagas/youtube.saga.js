import { put, takeEvery, takeLatest } from '@redux-saga/core/effects';
import axios from 'axios';



function* sendYouTubeVideosSaga() {
  yield takeEvery('SEND_YOUTUBE_VIDEO',youTubeVideosSaga );
} // end of singlePedalSaga

function* youTubeVideosSaga(action) {
  console.log('in sendYouTubeVideosSaga', action.payload);

  // post youtube-vids to database
  try{
    yield axios.post(`/api/youTube`, action.payload)
  } catch(error) {
    console.log('Error in sendYouTubeVideosSaga POST', error);
  }

};  // end of sendYouTubeVideosSaga



function* fetchYouTubeVideosSaga(){
  try {
    let response = yield axios.get('/api/youTube');
    yield put({
      type: 'SET_YOUTUBE_VIDEO',
      payload: response.data,
    });
  } catch (err) {
    console.log('fetch error', err);
  }
}




// export default sendYouTubeVideosSaga;

export { sendYouTubeVideosSaga, fetchYouTubeVideosSaga};