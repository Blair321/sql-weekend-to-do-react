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
    console.log('/api/todos POST:', req.body, req.query);
    const queryString = `INSERT INTO "todos" ( "name" , "complete")
VALUES ( '$1', false);
`
const values = [req.body.name];
pool.query(queryString.values). then ((results)=>{
res.sendStatus(201)
}).catch((err)=>{
    console.log(err);
    res.sendStatus(400)
})

}) 
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
