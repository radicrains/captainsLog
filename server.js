const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const logsController = require('./controllers/logs.js');
require('dotenv').config();

console.log(process.env.mongoURL);
//... and then farther down the file
mongoose.connect(`${process.env.mongoURL}`, { useNewUrlParser: true});
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

//Middleware
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use('/logs', logsController);






app.listen(port, ()=>{
    console.log('listening');
});