import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import './UserPage.css';
// import Grid from '@material-ui/core/Grid'; // this allows me to create grids.
// // Grid allows use



function PedalList() {
  const dispatch = useDispatch();
  
  useEffect(() =>{
    dispatch({
      type: 'FETCH_PEDALS'
    })
  },[]);

  const pedals = useSelector((store) => store.pedalReducer);

  return(
    <ul>
      {pedals.map(iPedal => (
        
        <div key={iPedal.id} >  
        <div> <img src={iPedal.photo} alt="" /></div>
      </div>
    ))}
    </ul>

  );

}



export default PedalList;
