import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import './PedalItem.css'



function pedalItem( {pedals} ) {
  const history = useHistory(); // this is used get to the next page

function goToDetailsPage(id) {
  console.log(id);
  history.push(`/details/${id}`)

}




    return (

      <div className="pedalImg" >
        <div > <img src={pedals.photo} alt="image of pedal" height="200px" onClick={() => goToDetailsPage(pedals.id)} /> </div>
         {/* pedal_name */}
        {/* pedal_likes */}
      </div>

    )



}




export default pedalItem;