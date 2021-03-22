import './myPedals.css'
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
  console.log('usersPedal useSelector',UsersPedals);


  useEffect(() =>{
    dispatch({
      type: 'FETCH_USERS_PEDALS',
    
    });
  },[]);

  // function detailsPage(){
  //   dispatch({
  //     type: 'FETCH_ONE_PEDAL',
  //     payload: { id: params.id } // this is getting the id 
  //   });
  // }


  return(
    <div>
        <Grid container justify="center" >

          <Grid item xs={6}>
          <div className="Top-Banner-myPedals" justify="center" >
            <h2>My pedal Board collection</h2>
            <p> checkout all of the pedals! </p>
          </div>
          </Grid>

        </Grid>

    {UsersPedals.map(iPedals => {
      return(
        <div key={iPedals.id} key={iPedals.photo} key={iPedals.pedal_name} >
          <div onClick={detailsPage} ><img src={iPedals.photo} alt="" height="200px" /></div>
          <div>{iPedals.pedal_name}</div>

        </div>
      )
    })}
    </div>

  )


}



export default MyPedals