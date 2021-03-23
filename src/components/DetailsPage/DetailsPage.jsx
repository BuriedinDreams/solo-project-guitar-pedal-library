import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import './DetailsPage.css'
import ReactPlayer from 'react-player'
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Grid from '@material-ui/core/Grid'; // this allows me to create grids.
import { useParams } from 'react-router';


function DetailsPage( ) {
  const dispatch = useDispatch();
  const params = useParams();

  
  const [ youTubeLink, setNewYouTubeLink ] = useState('') // this will capture what the users puts into the text box and use that for the ReactPlayer.
  const [ youTubeTitle, setNewYouTubeTitle ] = useState('') // this is capturing the youtube title created by the user.

  const [newPhoto, setNewPhoto] = useState('')

  const onePedal = useSelector((store) => store.PedalReducer.onePedalReducer);
  console.log('one pedal useSelector',onePedal);

  const youTubeVids = useSelector((store) => store.YouTubeReducer.fetchYouTubeVideosReducer)
  console.log('grab all the youtube vids.', youTubeVids);

// said pedal info store useSelector 

console.log('params.id', params.id); // this params.id is the id of the pedal.

useEffect(() =>{
  dispatch({
    type: 'FETCH_ONE_PEDAL',
    payload: { id: params.id } // this is getting the id 
  });
},[]);


  function handleSubmit(event) {
    console.log('handleSubmit event', event);
    event.preventDefault();


    dispatch({
      type: 'SEND_YOUTUBE_VIDEO',
      payload: { youTubeLink, id: params.id, youTubeTitle  } 
    });

  } // end handleSubmit


  function pedalLiked() {
    
    dispatch({
      type: 'ADD_LIKE',
      payload: { id: params.id }
    })

  }


  function submitNewInfo(event) {
    console.log('submitNewPhoto', event);
    event.preventDefault();

    dispatch({
      type: 'UPDATE_PEDAL_DETAILS',
      payload: {
        newPhoto,
        
      }
    })

  }


  return(
    <div>
      <Grid container >
        {/* aria-label="Edit Icon" component={ Link } to="/editMode" */}
      <IconButton >
        <EditIcon/>
      </IconButton>

        <Grid  item xs={6}>
        <h1>{onePedal.pedal_name}</h1> 
        </Grid>


        <form onSubmit={submitNewInfo}>
        <Grid  >
        <div><img src={onePedal.photo} alt="" height="200px" onChange={(event) => setNewPhoto(event.target.value)} /></div>
        <button>Submit</button>
        </Grid>
        </form>


        <Grid>
        <div><img src={onePedal.photo} alt="" height="200px" /></div>
        
        <IconButton onClick={pedalLiked} >
          <ThumbUpIcon  />
        </IconButton>
        </Grid>



        {/* <p>{onePedal.is_liked}</p> */}

        <Grid item xs={2}>
          <h2>Description</h2>
        </Grid>

        <Grid item xs={4}>
        <p>{onePedal.description_of_pedal}</p>
        </Grid>

        <form onSubmit={submitNewInfo}>
          <Grid item xs={4}>
          <p>{onePedal.description_of_pedal}</p>
          <button>Save</button>
          </Grid>
        </form>


        <Grid item xs={6}>
        <div className="textBox" >
          <h1>Enter YouTube Link in Textbox</h1>
          <form onSubmit={handleSubmit} >
            <input onChange={(event) => setNewYouTubeLink(event.target.value)} type= "text" placeholder= "Youtube Links here"/>
            <input onChange={(event) => setNewYouTubeTitle(event.target.value)} type= "text" placeholder= "YouTube title of choice"/>
          <button>Submit</button> 
          {/* ^^ Once this button is clicked it will submit all the information in the textboxes. */}
            <ReactPlayer url= {youTubeLink} controls={true} />
          </form> 


          <div>
          {youTubeVids.map(ivideo => {
            return(
              <div key={ivideo.id} key={ivideo.youTubeLink} key={ivideo.youtube_link_title} >
                <br/>
                <h3>{ivideo.youtube_link_title}</h3>
              < ReactPlayer url={ivideo.youtube_links} controls={true} />
            
            </div>
            )
          })}
          </div>

        </div>
        </Grid>

      </Grid>
          
    </div>
  )

}


export default DetailsPage;