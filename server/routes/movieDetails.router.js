const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')



//get all details (+genre) for a specific movie
router.get('/:id', (req, res) => {
    console.log('req.params.id', req.params.id)
    const queryText = `SELECT * FROM "movies"
            JOIN "movies_genres" ON "movies"."id"="movies_genres"."movies_id"
            JOIN "genres" ON "genres"."id" = "movies_genres"."genres_id" WHERE "movies"."id"=$1`;
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.send(result.rows[0]);
        })
        .catch((error) => {
            console.log(`Error on routerGetDetails in movie.router ${error}`);
            res.sendStatus(500);
        });
});


module.exports = router;