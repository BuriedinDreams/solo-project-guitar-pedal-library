const pool = require('../modules/pool');
const express = require('express');
const router = express.Router();


// Get router -- retrieving the information from the DB
// this GET is to retrieve all of the photos so they may be placed on the DOM.
router.get('/', (req, res) => {
  
  const query = `SELECT * FROM "photos"`; // this is going to grab all of the photos of the guitar pedals.
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

// Post new photos of guitar pedals
router.post('/', (req, res) => {
  console.log('req.body in pedal.router: POST',req.body );

  const pedalPhotoQuery =`
    INSERT INTO "photos" ("photo")
    VALUES ($1) ;`

    pool.query( pedalPhotoQuery, [req.body.photo] )
    .then((result) => {
      result.sendStatus(201);
    })
    .catch((error) => {
      console.log('Error in pedal.router POST', error);
      res.sendStatus(500);
    });

})

// update given photo with photo table
router.put('/:id', (req, res) => {
  console.log('req.params', req.params);
  console.log('req.body', req.body);
  let pedalId = req.params.id;
  let pedalPhoto = req.body; // not sure what to do for this one.
  const queryText = `UPDATE "photo" 
                SET "pedal_id" = (SELECT "pedal_id".id FROM "photo"
                WHERE "photo".photo = '${pedalPhoto}')
                WHERE "photo".id = $1;`
  pool.query(queryText, [pedalPhoto, pedalId ])
    .then((result) => {
      console.log('Successful PUT');
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('Error in PUT', err);
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