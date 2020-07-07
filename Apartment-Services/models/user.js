const Joi = require('joi');
const mongoose = require('mongoose');
const { User_Role } = require('./user_role');

const User = mongoose.model('User', new mongoose.Schema({
    user_name: String,
    email: String,
    password: String,
    full_name: String,
    date_of_birth: Date,
    gender: String,
    phone_number: String,
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User_Role',
        required: true
    }
}));

function validateUser(User) {
    const schema = {
        user_name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().min(8).max(12).required(),
        full_name: Joi.string().required(),
        phone_number: Joi.string().required()
    }
    return Joi.validate(User, schema, {allowUnknown:true});
}

exports.User = User;
exports.validate = validateUser;