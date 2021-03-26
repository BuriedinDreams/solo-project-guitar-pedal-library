import React, { useEffect } from 'react';
// import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid'; // this allows me to create grids
import { useParams } from 'react-router';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';




function AddNewPedal() {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory(); // this is used get to the next page


  const [pedalPhoto, setPedalPhoto] = useState('')
  const [ pedalName, setPedalName] = useState('') // This is capturing what the user inputs for the pedal name
  const [ description, setNewDescription ] = useState('') // this is capturing what the user puts in the textarea.
  const [ youTubeTitle, setNewYouTubeTitle ] = useState('') // this is capturing the youtube title created by the user.
  const [ youTubeLink, setNewYouTubeLink ] = useState([]) // this will capture what the users puts into the text box and use that for the ReactPlayer.

  function handleSubmit(event) {
    console.log('handleSubmit event', event);
    event.preventDefault();

    dispatch({
      type: 'SEND_PEDAL_INFO',
      payload: { pedalName, description, pedalPhoto, youTubeLink, youTubeTitle },

    });

    history.push('/#/user')

  } // end handleSubmit



  return(
    <div >
      <form onSubmit={handleSubmit} >
        <input onChange={(event) => setPedalName(event.target.value)} type= "text" placeholder= "Enter The Pedal Name" />
        <input onChange={(event) => setPedalPhoto(event.target.value)} type= "text" placeholder= "Guitar Pedal Image Link" />
        <textarea onChange={(event) => setNewDescription(event.target.value)}  
          id="descriptionBox"
          rows="8"
          cols="50"
          placeholder="Enter description of the new pedal here" >
        </textarea>


          <input onChange={(event) => setNewYouTubeTitle(event.target.value)} type= "text" placeholder= "YouTube title of choice"/>
          <input onChange={(event) => setNewYouTubeLink(event.target.value)} type= "text" placeholder= " Add YouTube URL Links here"/>
          <button>Submit</button> 
          {/* This button is going to activate the form onSubmit. */}
      </form>
    </div>
  );
  
}



export default AddNewPedal;