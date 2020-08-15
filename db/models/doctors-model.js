const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET_KEY = process.env.SECRET||'SECRET';

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
    token: {
        type: String,
        required: true
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

doctorSchema.methods.generateToken = async function(){
    const doctor = this;
    const token = await jwt.sign({_id:doctor.id}, SECRET_KEY);
    doctor.token = token;
    await doctor.save();
    return token;
};

doctorSchema.statics.verifyCredentials = async (email, password)=>{
    const doctor = await Doctors.findOne({email});
    if(!doctor) throw new Error('Credentials incorrect');
    const result = await bcrypt.compare(password, doctor.password);
    if(!result) throw new Error('Credentials incorrect');
    return doctor;
};

const Doctors = new mongoose.model('Doctor', doctorSchema);
module.exports = Doctors;

