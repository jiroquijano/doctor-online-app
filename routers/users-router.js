const express = require('express');
const User = require('../db/models/user-model');
const router = new express.Router();
const authentication = require('../middleware/auth');
const Doctor = require('../db/models/doctors-model');
const Patient = require('../db/models/patients-model');

router.post('/api/register', async(req,res)=>{
    try{
        const user = new User(req.body);
        await user.generateToken();
        const specificRegistration = req.body.accountType === 'doctor' ?
            new Doctor(req.body) : new Patient (req.body);
        specificRegistration.accountLink = user._id;
        await specificRegistration.save();
        await user.save();
        res.send(user);
    }catch(error){
        res.status(500).send(error.message);
    }
});

router.get('/api/verifytoken', authentication, (req,res)=>{
    try{
        res.send(req.user);
    }catch(error){
        res.status(500).send(error.message);
    }
});

router.post('/api/login', async (req,res)=>{
    try {
        if(!req.body.email || !req.body.password) {
            throw new Error('login credentials empty');
        }
        const user = await User.verifyCredentials(req.body.email, req.body.password);
        const token = await user.generateToken();
        res.send({user,token});
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/api/logout', authentication, async(req,res)=>{
    try {
        const user = req.user;
        user.token = ' ';
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;