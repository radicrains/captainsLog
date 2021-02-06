const express = require('express');
const router = express.Router();

//DATA MODEL / SCHEMA
const Log = require('../models/logs.js');

//NEW
router.get('/new',(req,res) => {
    res.render('new.ejs')
});

//CREATE
router.post('/', (req, res)=>{
    if(req.body.shipIsBroken === 'on'){ //if checked, req.body.shipIsBroken is set to 'on'
        req.body.shipIsBroken = true;
    } else { //if not checked, req.body.shipIsBroken is undefined
        req.body.shipIsBroken = false;
    }
    Log.create(req.body, (error, createdLogs)=>{
        // res.send(createdLogs);
        res.redirect('/logs');
    });
});

//CREATE INDEX ROUTE
router.get('/', (req, res)=>{
    Log.find({},(error,allLogs)=>{
        res.render('index.ejs',{
            logs: allLogs
        });
    });
});


//CREATE SHOW ROUTE
router.get('/:id', (req, res)=>{
    Log.findById(req.params.id, (err, foundLog)=>{
        res.render('show.ejs', {
            log:foundLog
        });
    });
});

//DELETE ROUTE
router.delete('/:id', (req, res)=>{
    Log.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/logs');//redirect back to logs index
    });
});

//EDIT ROUTE
router.get('/:id/edit', (req, res)=>{
    Log.findById(req.params.id, (err, foundLog)=>{ //find the log
        res.render(
    		'edit.ejs',
    		{
    			log: foundLog //pass in found log
    		}
    	);
    });
});


//PUT ROUTE
router.put('/:id', (req, res)=>{
    if(req.body.shipIsBroken === 'on'){
        req.body.shipIsBroken = true;
    } else {
        req.body.shipIsBroken = false;
    }
    Log.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
        // res.send(updatedModel);
        res.redirect('/logs');
    });
});


module.exports = router;