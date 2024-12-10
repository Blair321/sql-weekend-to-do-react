const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get( '/', ( req, res )=>{
    console.log( '/todos GET' );
    // assemble query
    const queryText = 'SELECT * FROM todos';
    // run pool.query
    pool.query( queryText ).then( ( results )=>{
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
router.delete( '/:id', ( req, res )=>{
    console.log( 'in /todos DELETE:', req.params.id );
        // assemble query
        const queryText = `DELETE FROM todos WHERE id=$1;`;
        const values = [ req.params.id ];
        // run pool.query
        pool.query( queryText, values ).then( ( results )=>{
            console.log("READY and ID", values)
            res.sendStatus( 200 ); // "OK"
        }).catch( ( err )=>{
            // handle any errors
            console.log( err );
            res.sendStatus( 400 );
        })
})
// DELETE
router.put( '/:id', ( req, res )=>{
    const queryText = `UPDATE todos SET "isComplete"=$1 WHERE id=$2;`;
    const r = req.body.isComplete ;
     
    const values = [  r , req.params.id  ];
    console.log(values);
    // run pool.query
    pool.query( queryText, values ).then( ( results )=>{
        res.sendStatus( 200 ); // "OK"
    }).catch( ( err )=>{
        // handle any errors
        console.log( err );
        res.sendStatus( 400 );
    })

})
module.exports = router;
