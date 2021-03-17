import React from 'react';
import ReactDOM from 'react-dom';
import logger from 'redux-logger';
import axios from 'axios';


const pedalReducer = ( state = [], action) => {
  if(action.type === 'SET_PEDALS'){
    return action.payload
  }
  return state;
}; // end pedalReducer




export default pedalReducer;