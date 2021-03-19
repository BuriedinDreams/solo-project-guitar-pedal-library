import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './DetailsPage.css'
import ReactPlayer from 'react-player'
import { useState } from 'react';

import Grid from '@material-ui/core/Grid'; // this allows me to create grids.
import { useParams } from 'react-router';


function DetailsPage( ) {
  const dispatch = useDispatch();
  const params = useParams();

  
  const [youTubeLink, setNewYouTubeLink] = useState('') // this will capture what the users puts into the text box and use that for the ReactPlayer.
  // const []

  const onePedal = useSelector((store) => store.PedalReducer.onePedalReducer);
  console.log('one pedal useSelector',onePedal);

// said pedal info store useSelector 

useEffect(() =>{
  dispatch({
    type: 'FETCH_ONE_PEDAL',
    payload: { id: params.id } // this is getting the id 
  });
},[]);


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
        <h1>{onePedal.pedal_name}</h1> 
        </Grid>

        <Grid>
        <div><img src={onePedal.photo} alt="" height="200px" /></div>
        </Grid>

        <Grid item xs={2}>
          <h2>Description</h2>
        </Grid>

        <Grid item xs={4}>
        <p>{onePedal.description_of_pedal}</p>
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