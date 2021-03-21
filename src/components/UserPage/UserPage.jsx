import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import './UserPage.css';
import PedalList from '../PedalList/PedalList'
import Grid from '@material-ui/core/Grid'; // this allows me to create grids.
import Button from '@material-ui/core/Button';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import { IconButton } from '@material-ui/core';




function UserPage() {
// This page is homepage. 
  const user = useSelector((store) => store.user);
  return (
    <div className="container">

<IconButton aria-label="Add Pedals" component={ Link } to="/newPedal" >
        < AddToPhotosIcon/>
      </IconButton>

{/* <Button component={ Link } to="/newPedal" variant="contained" color="primary">
    newPedal
</Button> */}

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