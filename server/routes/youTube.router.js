const pool = require('../modules/pool');
const express = require('express');
const router = express.Router();



// Post new youtube video links.
router.post('/', (req, res) => {
  console.log('req.body in pedal.router: POST',req.body );

  const youTubeQuery =`
  INSERT INTO "youtube_links" ("user_id", "pedal_id", "youtube_links", "youtube_link_title")
  VALUES ($1), ($2), ($3), ($4) 
  ;`

  pool.query( youTubeQuery, [req.body.video] )
  .then((result) => {
    result.sendStatus(201);
  })
  .catch((error) => {
    console.log('Error in youTube.router, POST', error);
    res.sendStatus(500);
  });

})

// This GET is going to retrieve all the data for the youtube videos
router.get('/', (req, res) =>{
  const youTubeVideoID = req.params.id
  
  queryText=`SELECT * FROM "youtube_links";`

  pool.query(queryText, [youTubeVideoID])
  .then(result =>{
    res.send(result.rows); 
  })
  .catch(error => {
    console.log('ERROR IN: youtube.router, GET', error);
    res.sendStatus(500)
  })

});













module.exports = router;