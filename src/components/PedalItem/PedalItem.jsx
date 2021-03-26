import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import './PedalItem.css'

import Grid from '@material-ui/core/Grid'; // this allows me to create grids.


function pedalItem( {pedals} ) { // this pedals is a parameter gotten from the on click event.
  const history = useHistory(); // this is used get to the next page

function goToDetailsPage(id) {
  console.log('This is the id for said pedal clicked',id);
  history.push(`/details/${id}`)

}




    return (


      <Grid container direction="row"  >

      <div className="pedalImg" >
        <div > <img src={pedals.photo} alt="image of pedal" height="200px" onClick={() => goToDetailsPage(pedals.id)} /> </div>
        <div>{pedals.pedal_name}</div> 
        <div>Has {pedals.Likes} Likes!</div>
      </div>

      </Grid>

    )



}




export default pedalItem;