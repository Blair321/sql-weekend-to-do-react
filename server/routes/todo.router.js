const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get( '/', ( req, res )=>{
    console.log( '/api/todos GET' );
    // assemble query
    const queryString = 'SELECT * FROM todos';
    // run pool.query
    pool.query( queryString ).then( ( results )=>{
        // return results.rows
        console.log(results.rows);
        res.send( results.rows );
    }).catch( ( err )=>{
        // handle any errors
        console.log( err );
        res.sendStatus( 400 );
    })
})
// POST
router.post('/', (req, res) => {
    console.log('req.body', req.body);
    const newToDo = req.body

    const queryText = `
        INSERT INTO "todos"("text", "isComplete") 
        VALUES ($1, $2);
    `
    const values = [newToDo.text, newToDo.isComplete]

    pool.query(queryText, values)
        .then((result) => {
            res.sendStatus(201)
        })
        .catch((error) => {
            console.log(`Error making query: ${queryText} -`, error)
            res.sendStatus(500)
        })
});
// PUT
router.delete( '/', ( req, res )=>{
    console.log( ' /api/todos DELETE:', req.body, req.query );
        // assemble query
        const queryString = `DELETE FROM todos WHERE id=$1;`;
        const values = [ req.query.id ];
        // run pool.query
        pool.query( queryString, values ).then( ( results )=>{
            console.log("READY and ID", values)
            res.sendStatus( 200 ); // "OK"
        }).catch( ( err )=>{
            // handle any errors
            console.log( err );
            res.sendStatus( 400 );
        })
})
// DELETE
router.put( '/', ( req, res )=>{
    const queryString = `UPDATE "todos" set complete =NOT complete WHERE "id"=$1`;
    const values = [ req.body.id  ];
    // run pool.query
    pool.query( queryString, values ).then( ( results )=>{
        res.sendStatus( 200 ); // "OK"
    }).catch( ( err )=>{
        // handle any errors
        console.log( err );
        res.sendStatus( 400 );
    })

})
module.exports = router;
