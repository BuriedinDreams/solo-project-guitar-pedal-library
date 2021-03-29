import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import './UserPage.css';
import PedalList from '../PedalList/PedalList'
import Grid from '@material-ui/core/Grid'; // this allows me to create grids.
import Button from '@material-ui/core/Button';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { IconButton } from '@material-ui/core';




function UserPage() {
// This page is the Homepage. 
  const user = useSelector((store) => store.user);
  return (
    <div className="container">

      <IconButton aria-label="Add Pedals" component={ Link } to="/newPedal"  color="primary" >
        < AddToPhotosIcon/>
      </IconButton>

      <IconButton aria-label="Add Pedals" component={ Link } to="/myPedals"  color="primary" >
        < AccountBoxIcon/>
      </IconButton>


      <Grid container direction="row" justify="center"  >
        <Grid item xs={6}  >
          <div className="Top-Banner">
            <h2>Welcome to the Guitar Pedal Library</h2>
            <p> checkout all of the pedals! </p>
          </div>

          <Grid container direction="row"  >
            <PedalList />
          </Grid>
        </Grid>
      </Grid >

    </div>
  );
}


export default UserPage;
