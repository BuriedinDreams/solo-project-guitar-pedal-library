const pool = require('../modules/pool');
const express = require('express');
const router = express.Router();



// this GET is to retrieve all of the photos so they may be placed on the DOM.
router.get('/', (req, res) => {
  
  const query = `SELECT count("likes".id) as "Likes", "pedal".id, "pedal".pedal_name, "pedal"
  description_of_pedal, "pedal".photo 
  FROM "pedal"
  LEFT OUTER JOIN "likes" on "likes".pedal_id = "pedal".id
  GROUP BY "pedal".id
   ;`; // this is going to grab all of the photos of the guitar pedals.
  const pedalId = req.params.id;
  pool.query(query )
    .then( result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log('ERROR: in pedal.router GET', error);
      res.sendStatus(500)
    })

});

// This GET route will grab only 1 pedal from the DOM.
router.get('/onePedal/:id', (req, res) => {
  console.log('req.params.id PEDAL', req.params.id);
  
  const queryText = `
  SELECT count("likes".id) as "Likes", "pedal".id, "pedal".pedal_name, "pedal".description_of_pedal, "pedal".photo, ( SELECT id FROM "likes" WHERE "user_id" = $1 AND "pedal_id" = $2 ) AS isliked
  FROM "pedal"
  LEFT OUTER JOIN "likes" on "likes".pedal_id = "pedal".id
  WHERE "pedal".id = $2
  GROUP BY "pedal".id
   ;`
  const pedalID = req.params.id
  // we are feeding in the user who clicked the pedal. 
  pool.query(queryText, [req.user.id, pedalID])
  .then(result =>{
    res.send(result.rows[0]); // This will only grab one row of data.
  })
  .catch(error => {
    console.log('ERROR IN: pedal.router, GET 1 pedal', error);
    res.sendStatus(500)
  })

})

// Add Pedal Post. This is POSTING all the info from the AddPedalPage
router.post('/', (req, res) => {
  console.log('req.body in pedal.router: POST',req.body );

  const pedalInfo =`
    INSERT INTO "pedal" ( "user_id", "pedal_name", "description_of_pedal", "photo" )
    VALUES ( $1, $2, $3, $4 ) RETURNING "id" ;`

    // First Query makes the pedal information
    pool.query( pedalInfo, [ req.user.id, req.body.pedalName, req.body.description, req.body.pedalPhoto ] )
    .then((result) => {
      const pedalId = result.rows[0].id;
      console.log('pedalId', pedalId);

        const youTubeQuery =`
        INSERT INTO "youtube_links" ("user_id", "pedal_id", "youtube_links", "youtube_link_title")
        VALUES ($1, $2, $3, $4) 
        ;`

        pool.query( youTubeQuery, [req.user.id, pedalId, req.body.youTubeLink, req.body.youTubeTitle ] )  // this is retrieving the information from newPedalPage.
        .then((result) => {
          res.sendStatus(201);
        })
        .catch((error) => {
          console.log('Error in pedal.router YouTube PART, POST', error);
          res.sendStatus(500);
        })

      // });
    })
    .catch((error) => {
      console.log('Error in pedal.router POST', error);
      res.sendStatus(500);
    });
})

// This is going to post the Like information to the DB.
router.post('/likes', (req, res) => { 
  console.log('req.body in POST router for Likes ',req.body );

  const queryText = ` INSERT INTO "likes" ( "user_id", "pedal_id" )
  VALUES ($1, $2 )ON CONFLICT DO NOTHING ; `

  pool.query( queryText, [ req.user.id, req.body.id ] )
    .then((result) => {
      res.sendStatus(201);
  }).catch((error) =>{
    console.log('Error in pedal.router POST for Likes', error);
      res.sendStatus(500);
  }) 

})  

// This GET will retrieve all the pedals the said user created
router.get('/myPedals', (req, res) => {
  const queryText = `
  SELECT *
  FROM "pedal"
  WHERE "user_id" = $1
  ;
    `;

  pool.query(queryText, [req.user.id ])
  .then( result => {
    console.log('This is what we are getting in the DataBase', result);
    console.log('Got data for user:', req.user.id);
    res.send(result.rows);
  })
  .catch(error => {
    console.log('ERROR: in GET /myPedals pedal.router GET', error);
    res.sendStatus(500)
  })

});

// update given photo with photo table
router.put('/update', (req, res) => {
  console.log('req.params', req.params);
  console.log('req.body', req.body);
  let pedalId = req.params.id;
  let description = req.body.description;
  let photo = req.body.photo;
  const queryText = `
  UPDATE "pedal"
  SET "description_of_pedal" = $1, "photo" = $2
  WHERE "id" = $3 AND "user_id" = $4  -- this will catch if there are multiples of the same pedal.
  ;
    `;
  pool.query(queryText, [ description, photo, pedalId, req.user.id ])
    .then((result) => {
      console.log('Successful PUT');
      let youTubeLinks = req.body.Links;
      let youTubeTitleName = req.body.youTubeTitleName;
      let pedalId = req.params.id;
      

      const youTubeUpdateQuery =`
      UPDATE "youtube_links"
      SET "youtube_links" = $1, "youtube_link_title" = $2
      WHERE "pedal_id" = $3 AND "user_id" = $4
      ;
        `;

    pool.query(youTubeUpdateQuery, [youTubeLinks, youTubeTitleName, pedalId, req.user.id])
    .then(result =>{
      console.log('Successful PUT');
    })
    .catch((error) => {
      console.log('Error in PUT Youtube', error);
      res.sendStatus(500);
    })

    })
    .catch((err) => {
      console.log('Error in PUT PEDAL', err);
      res.sendStatus(500);
    })

  res.sendStatus(200);
});


// this delete will be able to delete a photo 
router.delete('/:id', (req, res) => {
  const queryText = 'DELETE FROM "photo" WHERE id=$1';
  pool.query(queryText, [req.params.id])
    .then(() => { res.sendStatus(200); })
    .catch((error) => {
      console.log('Error deleting a photo in pedal.router', error);
      res.sendStatus(500);
    });
});




module.exports = router;