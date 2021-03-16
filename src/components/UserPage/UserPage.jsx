import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import './UserPage.css';
import Grid from '@material-ui/core/Grid'; // this allows me to create grids.
// Grid allows use


function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <Grid container >
        <Grid item xs={6}>
          <div className="Top-Banner">
            <h2>Welcome to the Guitar Pedal Library</h2>
            <p> checkout all of the pedals! </p>
          </div>
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