const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;
const mongoose = require('./db/mongoose');

app.listen(3000, ()=>{
    console.log(`listening on port: ${PORT}`)
});

app.get('/', (req,res)=>{
    console.log('heya');
    res.send('hello world');
});
