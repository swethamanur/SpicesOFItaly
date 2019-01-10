const express = require('express');
const app = express();

const mongoose = require('./config/db');
const {routes} = require('./config/routes');
//setting the port
const port = process.env.PORT || 3000;

//allowing the user to parse only json thru incoming req.body
app.use(express.json());

// app.get('/',(req,res) => {
//     res.send('Welcome to our home page!')
// });

app.use('/',routes);

//listening to the port
app.listen(port,(req,res) => {
    console.log(`You are listening on port ${port}`);
})

