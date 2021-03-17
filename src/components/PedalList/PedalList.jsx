import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import './UserPage.css';
import Grid from '@material-ui/core/Grid'; // this allows me to create grids.
// Grid allows use



function PedalList() {
  // const dispatch = useDispatch();

  // const pedals = useSelector((store) => store.pedals);

  useEffect(() =>{
    // dispatch({
    //   type: 'FETCH_PEDALS'
    // })
  },[]);

  return(
    <div>
    {/* {pedals.map(iPedal, index => (
      <div key={index}>
        {iPedal.name}
      </div>
    ))} */}
    </div>

  );

}



export default PedalList;
