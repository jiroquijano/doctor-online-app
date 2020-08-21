const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    name:{
        firstName:{
            type:String,
            required: true,
            trim: true
        },
        lastName:{
            type:String,
            required: true,
            trim: true
        }
    },
    specializations:[{
        type: String,
        default: ['general practitioner']
    }],
    licenceNumber: {
        type: String,
        required: true
    },
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

