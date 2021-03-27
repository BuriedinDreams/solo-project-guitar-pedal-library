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
  const [newPhoto, setNewPhoto] = useState('') // this is capturing the new photo the user enters.
  const [ newDescription, setNewDescription ] = useState('')
  const [isClicked, setIsClicked] = useState(false)
  const [colorChange, setColorChange] =useState(true) // this is will make the color of the button change to blue, once clicked.
  // canelBtn useState(false)
  // saveBtn useState(false)
  

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
    
    setColorChange(false)
    
    dispatch({
      type: 'ADD_LIKE',
      payload: { id: params.id }
    })

  }


  function submitNewPhoto(event) {
    console.log('submitNewPhoto', event);
    event.preventDefault();

    dispatch({
      type: 'UPDATE_PEDAL_PHOTO',
      payload: {
        newPhoto,
        id: params.id,
      }
    })
  }

  function submitNewDescription(event) {
    console.log('submitNewDescription', event);
    event.preventDefault();

    dispatch({
      type: 'UPDATE_PEDAL_DESCRIPTION',
      payload: {
        newDescription,
        id: params.id,
      }
    })
  }

  function submitNewYouTubeVideos(event) {
    console.log('submitNewYouTubeVideos', event);
    event.preventDefault();

    dispatch({
      type: 'UPDATE_PEDAL_YOUTUBE',
      payload: {
        youTubeLink,
        youTubeTitle,
        id: params.id,
      }
    })
  }



  function handleClick() {
    console.log("I'm Clicked", )

    setIsClicked(!isClicked) // everytime the button is clicked this function will set it to the oppsite action. 
  
  }

  

  return(
    <div>
      <Grid  >
        {/* aria-label="Edit Icon" component={ Link } to="/editMode" */}

       <Grid container item xs={4} justify="flex-start"  >
          <IconButton onClick={handleClick} >
            <EditIcon/>
          </IconButton>
       </Grid> 

        <Grid container justify="center"  >
        <h1>{onePedal.pedal_name}</h1> 
        </Grid>

        <Grid container
              direction="row"
              justify="flex-end"
              // alignItems="center"
              spacing ={4}
               >
              <Grid xs={3} >
              <h2>Description</h2>
              </Grid>
        </Grid>


        {/* ? Is showing what will be rendered when the user clicks the edit button.  VS  : is showing what will be default on the DOM */}

        <div>
          {isClicked
              ?
              <div>
                <form onSubmit={submitNewPhoto}>
                <Grid item xs={12} >
                <div><img src={onePedal.photo} alt="" height="200px"  /></div>
                <input onChange={(event) => setNewPhoto(event.target.value)} type="text" placeholder="enter new URL photo here" value={newPhoto} />
                <button>Save</button>
                </Grid>
                </form>
              </div>

              :
              <div>
                {colorChange
                ?
                <div>
                  <Grid  item xs={8}  >
                <div><img src={onePedal.photo} alt="" height="200px" /></div>
                <IconButton onClick={pedalLiked} >
                <ThumbUpIcon  />
              </IconButton>
                  </Grid>
                </div>
                
                  :
                <Grid item xs={2} >
                  <div><img src={onePedal.photo} alt="" height="200px" /></div>
                  <IconButton onClick={pedalLiked}  color="primary">
                    <ThumbUpIcon  />
                  </IconButton>
                </Grid>
            }
            </div>
              
              } 

              {isClicked
                  ?
                  <div>
                  <form onSubmit={submitNewDescription}>
                  <Grid item xs={12}  >
                    <textarea onChange={(event) => setNewDescription(event.target.value)}  id="descriptionBox" rows="8" cols="50" >{onePedal.description_of_pedal}</textarea>
                  <button>Save</button>
                  </Grid>
                </form>
                </div>
                  
    
                :
                <div>
                  <Grid item xs={4}>
                    <p>{onePedal.description_of_pedal}</p>
                  </Grid>
                </div>
                

              }
        </div>


        {isClicked && (<Grid item xs={6}>
          <div className="textBox" >
            <h3>Enter YouTube Link in Textbox</h3>
            <form onSubmit={submitNewYouTubeVideos} >
              <input onChange={(event) => setNewYouTubeLink(event.target.value)} type= "text" placeholder= "Youtube Links here"/>
              <input onChange={(event) => setNewYouTubeTitle(event.target.value)} type= "text" placeholder= "YouTube title of choice"/>
            <button>Save</button> 
            {/* ^^ Once this button is clicked it will submit all the information in the textboxes. */}
              <ReactPlayer url= {youTubeLink} controls={true} />
            </form> 
          </div>
        </Grid>)}
          
        


          <div>
          {youTubeVids.map(iVideo => {
            return(
              <div key={iVideo.id} key={iVideo.youTubeLink} key={iVideo.youtube_link_title} >
                <br/>
                <h3>{iVideo.youtube_link_title}</h3>
              < ReactPlayer url={iVideo.youtube_links} controls={true} />
            
            </div>
            )
          })}
          </div>
        </Grid>
        </div>

  )

}


export default DetailsPage;