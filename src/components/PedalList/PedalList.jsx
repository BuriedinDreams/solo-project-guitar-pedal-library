import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PedalItem from '../PedalItem/PedalItem';
import DetailsPage from '../DetailsPage/DetailsPage';
// import './UserPage.css';
import Grid from '@material-ui/core/Grid'; // this allows me to create grids




function PedalList() {
  const dispatch = useDispatch();
  
  useEffect(() =>{
    dispatch({
      type: 'FETCH_PEDALS'
    })
  },[]);

  const pedals = useSelector((store) => store.PedalReducer.allPedalsReducer); 
  // by having PedalReducer.allPedalsReducer grabs from the exact reducer we want information to be grabbed from.

  return(
    <ul>
      <Grid container direction="row" spacing={3}  >
      {pedals.map(iPedal => {
          return(
            <Grid item xs={4}  >
              <div key={iPedal.id} key={iPedal.pedal_name}  >  
                {/* This is going to send the Individual pedals to the Pedal Item file.  */}
                <PedalItem pedals={iPedal} /> 
              </div>
            </Grid>

          )
        })}
      </Grid>
    </ul>

  );

}



export default PedalList;
