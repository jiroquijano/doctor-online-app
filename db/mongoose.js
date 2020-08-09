const mongoose = require('mongoose');
const uri = process.env.MONGO_URL;

mongoose.connect(uri, {
        useNewUrlParser:true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(()=>{
        console.log('connected to db!');
    }).catch((e)=>{
        console.log(e);
    });