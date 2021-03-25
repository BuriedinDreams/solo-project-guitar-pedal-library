const pool = require('../modules/pool');
const express = require('express');
const router = express.Router();



// Post new youtube video links.
router.post('/', (req, res) => {
  console.log('req.body in pedal.router: POST',req.body );

  const youTubeQuery =`
  INSERT INTO "youtube_links" ("user_id", "pedal_id", "youtube_links", "youtube_link_title")
  VALUES ($1, $2, $3, $4) 
  ;`

  pool.query( youTubeQuery, [req.user.id, req.body.id, req.body.youTubeLink, req.body.youTubeTitle ] )  // this is retrieving the information from DetailsPage.
  .then((result) => {
    res.sendStatus(201);
  })
  .catch((error) => {
    console.log('Error in youTube.router, POST', error);
    res.sendStatus(500);
  });

});

// This GET is going to retrieve said youtube videos that match the id.
router.get('/:id', (req, res) =>{
  console.log(' GET /:id req.body', req.body);
  console.log('GET /:id req.params', req.params);
  console.log('GET /:id req.params.id', req.params.id);

  // console.log('req.body.id', req.body);
  
  queryText=`
  SELECT * 
  FROM "youtube_links"
  WHERE "pedal_id" = $1 AND "user_id" =$2
  ;`

  pool.query(queryText,[req.params.id, req.user.id] ) 
  .then(result =>{
    console.log('result.rows', result.rows);
    res.send(result.rows); // might be result.rows[0]
    // ^ this is sending the information we asked for.
  })
  .catch(error => {
    console.log('ERROR IN: youtube.router, GET', error);
    res.sendStatus(500)
  })

});



module.exports = router;