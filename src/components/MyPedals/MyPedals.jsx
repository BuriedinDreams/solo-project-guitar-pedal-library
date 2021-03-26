import './myPedals.css'
import React, { useEffect } from 'react';
// import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid'; // this allows me to create grids
import { useParams } from 'react-router';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';





function MyPedals() {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory(); // this is used get to the next page
 

  const UsersPedals = useSelector((store) => store.PedalReducer.UsersPedalReducer);
  console.log('usersPedal useSelector',UsersPedals);


  useEffect(() =>{
    dispatch({
      type: 'FETCH_USERS_PEDALS',
    
    });
  },[]);

  function handleDelete(pedalID){
    console.log('pedalID', pedalID);

    dispatch({
      type: 'DELETE_PEDAL',
      payload: pedalID
    });

  
    
    history.push('/#/user')
    
  }


  return(
    <div>
        <Grid container justify="center"  >

          <Grid item xs={6}>
          <div className="Top-Banner-myPedals" justify="center" >
            <h2>My pedal Board collection</h2>
            <p> checkout all of the pedals! </p>
          </div>
          </Grid>

        </Grid>

    {UsersPedals.map(iPedals => {
      return(
        // <form onSubmit={handleDelete}>
        <div key={iPedals.id} key={iPedals.photo} key={iPedals.pedal_name} className="pedalsRow" >
          <div ><img src={iPedals.photo} alt="" height="200px" /></div>
          <button onClick= {(event) => handleDelete(iPedals.id)} >Delete</button>
          <div>{iPedals.pedal_name}</div>
        </div>
        // </form>
      )
    })}
    </div>

  )


}



export default MyPedals