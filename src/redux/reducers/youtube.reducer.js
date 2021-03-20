import React from 'react';
import ReactDOM from 'react-dom';
import logger from 'redux-logger';
import axios from 'axios';
import { combineReducers } from 'redux';



const fetchYouTubeVideosReducer = (state =[], action) =>{
  if(action.type === 'SET_YOUTUBE_VIDEO') {
    return action.payload
  }
  return state;
}; // end of fetchYouTubeVideosReducer 




export default combineReducers({
  fetchYouTubeVideosReducer,

})  