const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();



router.get('/', (req, res) => {

  const query = `SELECT * FROM "photos"`; // this is going to grab all of the photos of the guitar pedals.
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log('ERROR: in pedal.router GET', error);
      res.sendStatus(500)
    })

});

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
















module.exports = router;