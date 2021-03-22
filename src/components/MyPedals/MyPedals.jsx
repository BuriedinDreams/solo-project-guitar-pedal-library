import React, { useEffect } from 'react';
// import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid'; // this allows me to create grids
import { useParams } from 'react-router';
import { useState } from 'react';



function MyPedals() {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() =>{
    dispatch({
      type: 'FETCH_USERS_PEDALS',
      payload: { 
        id: params.id  // this is getting the pedal id 
      } 
    });
  },[]);


  return(
    <div>

      <h1>TEST</h1>






    </div>

  )


}



export default MyPedals