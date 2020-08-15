const express = require('express');
const router = new express.Router();
const Doctor = require('../db/models/doctors-model');
const authentication = require('../middleware/auth');

const showPublicInformation = (doctorsList)=>{
    const result = doctorsList.map((doctor)=>{
        return {
            name: doctor.name,
            specializations: doctor.specializations,
            email: doctor.email
        }
    });
    return result;
};

router.post('/api/doctor/register', async(req,res)=>{
    try{
        const doctor = new Doctor(req.body);
        await doctor.generateToken();
        await doctor.save();
        res.send(doctor);
    }catch(error){
        res.status(500).send(error.message);
    }
});

router.post('/api/login', async (req,res)=>{
    try {
        const doctor = await Doctor.verifyCredentials(req.body.email, req.body.password);
        const token = await doctor.generateToken();
        res.send({doctor,token});
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

router.get('/api/doctor/me', authentication, (req,res)=>{
    try {
        res.send(req.user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/api/doctors', async (req,res)=>{
    try{
        const doctorsList = await Doctor.find({});
        res.send(showPublicInformation(doctorsList));
    }catch(error){
        res.status(500).send(error.message);
    }
});

router.get('/api/doctors/:id', async (req,res)=>{
    try {
        const doctor = await Doctor.findOne({_id:req.params.id});
        const queryResult = {
            name: doctor.name,
            specializations: doctor.specializations,
            email: doctor.email
        };
        res.send(queryResult);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

module.exports = router;
