import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid'; // this allows me to create grids.
// Grid allows use




function AddNewPedal() {

  


  return(
    <div className="container">
      <Grid container justify="center" >
        <Grid item xs={6}>
          <div className="Top-Banner">
            <h2> My Pedal Board Collection </h2>
          </div>
          {/* need pedals from said user to appear here. */}
          </Grid>
      </Grid >

    </div>
  );
  
}



export default AddNewPedal;