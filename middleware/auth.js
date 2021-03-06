const jwt = require('jsonwebtoken');
const User = require('../db/models/user-model');
const SECRET_KEY = process.env.SECRET || 'SECRET';

const authenticate = async (req,res,next) =>{
    try {
        const token = req.header('Authorization').replace('Bearer ','');
        const decoded = await jwt.verify(token,SECRET_KEY);
        const user = await User.findOne({_id:decoded._id, token});
        if(!user) throw new Error('Authorization failed');
        req.user = user;
        next();
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = authenticate;