import React, { useEffect } from 'react';
// import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid'; // this allows me to create grids
import { useParams } from 'react-router';
import { useState } from 'react';



function MyPedals() {
  const dispatch = useDispatch();
  const params = useParams();

  const UsersPedals = useSelector((store) => store.PedalReducer.UsersPedalReducer);
  console.log('one pedal useSelector',UsersPedals);


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

    <h1></h1>
    
    {UsersPedals.map(iPedals => {
      return(
        <div key={iPedals.id} key={iPedals.photo} >
          <div><img src={iPedals.photo} alt="" height="200px" /></div>



        </div>
      )
    })}
    </div>

  )


}



export default MyPedals