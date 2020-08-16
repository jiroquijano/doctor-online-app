const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('./db/mongoose');
const doctorsRouter = require('./routers/doctors-router');

app.use(express.json());
app.use(doctorsRouter);

app.listen(PORT, ()=>{
    console.log(`listening on port: ${PORT}`)
});
