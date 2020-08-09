const mongoose = require('mongoose');
const validator = require('validator');

const doctorSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        validate (emailAddress){
            if(!validator.isEmail(emailAddress)){
                throw new Error('email address is not valid');
            }
        }
    },
    password:{
        type: String,
        required: true
    },
    specializations:[{
        type: String,
        default: ['general practitioner']
    }],
    availability:{
        type: Boolean,
        default: false
    },
    patientHistory:[{
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient'
        },
        date: {type: String}
    }],
    contactNumer:{type: Number}
});

const Doctors = new mongoose.model('Doctor', doctorSchema);
module.exports = Doctors;

