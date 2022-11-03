const express = require("express");
const  routes  = require("./routes/route");
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
var xss = require('xss-clean')
const bodyParser = require('body-parser');


const app=express();
app.use(cors());
app.use(mongoSanitize());
app.use(xss())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({limit:"60mb"}));
app.use(express.json());
app.use('/',routes)
const mongoString ='mongodb+srv://ayoseun:Jared15$@cashflakes.dgkmv.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server Started at ${3000}`)
})