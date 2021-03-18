import React from 'react';
import {useDispatch,useSelector} from 'react-redux';
import './DetailsPage.css'
import ReactPlayer from 'react-player'
import { useState } from 'react';

import Grid from '@material-ui/core/Grid'; // this allows me to create grids.


function DetailsPage() {
  const dispatch = useDispatch();


  const [youTubeLink, setNewYouTubeLink] = useState('') // this will capture what the users puts into the text box and use that for the ReactPlayer.


  function handleSubmit(event) {
    //console.log('Im clicked', newSearch);
    event.preventDefault();

    dispatch({
      type: 'SEND_YOUTUBE_VIDEO',
      payload: youTubeLink, 
    });
    
  } // end handleSubmit




  return(
    <div>
      <Grid container >

       
        <Grid  item xs={6}>
        <h1>TS9 Tube Screamer</h1>
        </Grid>

        <Grid item xs={2}>
          <h2>Description</h2>
        </Grid>

        <Grid item xs={4}>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Obcaecati deleniti odio eum maxime sapiente quaerat a modi sequi voluptatum 
          accusamus esse laboriosam velit,doloremque doloribus consequuntur, 
          derp quia ea vitae.</p>
        </Grid>


        <Grid item xs={6}>
        <div className="textBox" >
          <h1>Enter YouTube Link in Textbox</h1>
          <form onSubmit={handleSubmit} >
            <input onChange={(event) => setNewYouTubeLink(event.target.value)} type= "text" placeholder= "Youtube Links here"/>
            <ReactPlayer url= {youTubeLink} controls={true} />
          </form> 
        </div>
        </Grid>




      </Grid>
          
    </div>
  )

}











export default DetailsPage;