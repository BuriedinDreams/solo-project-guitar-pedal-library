import { put, takeEvery, takeLatest } from '@redux-saga/core/effects';
import axios from 'axios';



function* sendYouTubeVideosSaga() {
  yield takeEvery('SEND_YOUTUBE_VIDEO',youTubeVideosSaga );
  yield takeEvery('FETCH_YOUTUBE_VIDEO', fetchYouTubeVideosSaga)
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




function* fetchYouTubeVideosSaga(action){
  try {
    let response = yield axios.get(`/api/youTube/${action.payload}`);
    // this axios get this getting the information from the youtube.router get
    console.log('what is the response', response.data);
    yield put({
      type: 'SET_YOUTUBE_VIDEO', // this is in the youtube.reducer.
      payload: response.data, // this carrying the sql info.
    });
  } catch (err) {
    console.log('fetch error', err);
  }
}




// export default sendYouTubeVideosSaga;

export { sendYouTubeVideosSaga, fetchYouTubeVideosSaga};