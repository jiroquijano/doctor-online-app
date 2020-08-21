const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
require('./db/mongoose');
const doctorsRouter = require('./routers/doctors-router');
const userRouter = require('./routers/users-router');

app.use(express.json());
app.use(doctorsRouter);
app.use(userRouter);

app.listen(PORT, ()=>{
    console.log(`listening on port: ${PORT}`)
});
