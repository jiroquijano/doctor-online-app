const mongoose  = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET||'SECRET';

const userSchema = mongoose.Schema({
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
    accountType: {
        type: String,
        required: true,
        enum : ['doctor', 'patient']
    },
    token: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        const encrypted = await bcrypt.hash(user.password,8);
        user.password = encrypted;
    }
    next();
});

userSchema.methods.generateToken = async function(){
    const user = this;
    const token = await jwt.sign({_id:user.id}, SECRET_KEY);
    user.token = token;
    await user.save();
    return token;
};

userSchema.statics.verifyCredentials = async (email, password)=>{
    const user = await Users.findOne({email});
    if(!user) throw new Error('Credentials incorrect');
    const result = await bcrypt.compare(password, user.password);
    if(!result) throw new Error('Credentials incorrect');
    return user;
};

const Users = new mongoose.model('User', userSchema);
module.exports = Users;