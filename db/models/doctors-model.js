const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const doctorSchema = mongoose.Schema({
    name:{
        firstname:{
            type:String,
            required: true,
            trim: true
        },
        lastname:{
            type:String,
            required: true,
            trim: true
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
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

doctorSchema.pre('save', async function(next){
    const doctor = this;
    if(doctor.isModified('password')){
        const encrypted = await bcrypt.hash(doctor.password,8);
        doctor.password = encrypted;
    }
    next();
});

const Doctors = new mongoose.model('Doctor', doctorSchema);
module.exports = Doctors;

