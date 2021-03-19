import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import './UserPage.css';
import PedalList from '../PedalList/PedalList'
import Grid from '@material-ui/core/Grid'; // this allows me to create grids.
// Grid allows use


function UserPage() {
// This page is homepage. 
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <Grid container justify="center" >
        <Grid item xs={6}>
          <div className="Top-Banner">
            <h2>Welcome to the Guitar Pedal Library</h2>
            <p> checkout all of the pedals! </p>
          </div>


          <PedalList />



          </Grid>
      </Grid >

    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;











{/* <h2>Welcome, {user.username}!</h2>
<p>Your ID is: {user.id}</p>
<LogOutButton className="btn" /> */}