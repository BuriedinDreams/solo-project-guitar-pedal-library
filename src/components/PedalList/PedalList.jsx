import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PedalItem from '../PedalItem/PedalItem';
// import './UserPage.css';




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
      {pedals.map(iPedal => {
          return(
            <div key={iPedal.id} >  
            {/* This is going to send the Individual pedals to the Pedal Item file.  */}
            <PedalItem pedals={iPedal} /> 
          </div>
          )
        })}
        
        
    
    </ul>

  );

}



export default PedalList;
