const Joi = require('joi');
const mongoose = require('mongoose');

const ApartmentUser = mongoose.model('User', new mongoose.Schema({
    user_Name: String,
    email: String,
    password: String,
    full_name: String,
    date_of_birth: Date,
    gender: String,
    phone_number: String,
    role: {
        role_code: String,
        desc: String
    }
}));

function validateUser(ApartmentUser) {
    const schema = {
        user_Name: Joi.string().required(),
        email: Joi.string().required(),
        full_name: Joi.string().required(),
        phone_number: Joi.string().required()
    }
}

exports.ApartmentUser = ApartmentUser;
exports.validate = validateUser;