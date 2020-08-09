const mongoose = require('mongoose');
const validator = require('validator');

const patientSchema = mongoose.Schema({
    name:{
        firstName:{
            type: String,
            required: true,
            trim: true
        },
        surname: {
            type: String,
            required: true,
            trim: true
        },
        middlename: {
            type: String,
            trim: true
        }
    },
    email: {
        type: String,
        validate(emailAddress){
            if(!validator.isEmail(emailAddress)){
                throw new Error('email address invalid!');
            }
        }
    },
    address: {type: String},
    contactNumber: {type: Number},
    vitalSignHistory:[{
        date:{
            type: String
        },
        notes: {
            type: String
        },
        bloodPressure:{
            systolic: {type: Number},
            diastolic: {type: Number}
        },
        oxygenSaturationLevel:{
            type: Number
        },
        bodyTemperature:{
            tempLevel:{type: Number},
            method: {type: String}
        },
        pulse:{
            type: Number
        },
        respiratoryRate:{
            type: Number
        }
    }],
    consults:[{
        date: {type: String},
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor'
        },
        chiefComplaint: {type: String},
        diagnosis: {type: String},
        advise: {type: String}
    }]
});

const Patient = new mongoose.model('Patient', patientSchema);
module.exports = Patient;