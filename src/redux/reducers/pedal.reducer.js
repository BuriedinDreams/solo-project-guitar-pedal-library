import React from 'react';
import ReactDOM from 'react-dom';
import logger from 'redux-logger';
import axios from 'axios';
import { combineReducers } from 'redux';


const allPedalsReducer = ( state = [], action) => {
  if(action.type === 'SET_PEDALS'){
    return action.payload
  }
  return state;
}; // end pedalReducer


const onePedalReducer = ( state =[], action ) => {
  if (action.type === 'SET_ONE_PEDAL') {
    return action.payload;
  }
  return state;
} // end onePedalReducer



export default combineReducers({
  allPedalsReducer,
  onePedalReducer,

})  