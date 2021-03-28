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
    <Grid container alignItems="center" direction="column" spacing={3} >
        <Grid container item justify="center" xs={12} >
          <Grid item xs={6} >
          <div className="Top-Banner-myPedals" >
            <h2>My Pedal Board Collection</h2>
            <p> checkout all of the pedals! </p>
          </div>
          </Grid>
        </Grid>


      <Grid container item direction="row" alignItems="center" xs={6} spacing={2} >
      {UsersPedals.map(iPedals => {
        return(
          <Grid container item xs={4} direction="column" justify="center" alignItems="center" key={iPedals.id} key={iPedals.photo} key={iPedals.pedal_name} className="pedalsRow" >
            <Grid item >
              <img src={iPedals.photo} height="200px" />
            </Grid>
            <Grid item >
              <button onClick= {(event) => handleDelete(iPedals.id)} >Delete</button> 
            </Grid>
            <Grid item >
              <div>{iPedals.pedal_name}</div> 
            </Grid>
          </Grid>
        )
      })}
      </Grid>      
    </Grid>

  )

}

export default MyPedals