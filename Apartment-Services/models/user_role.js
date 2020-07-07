const Joi = require('joi');
const mongoose = require('mongoose');

const User_Role = mongoose.model('User_Role', new mongoose.Schema({
    role_code: String,
    desc: String,
}));

function validateUserRole(User_Role) {
    const schema = {
        role_code: Joi.string().required(),
        desc: Joi.string().required(),
    }
    return Joi.validate(User_Role, schema, { allowUnknown: true });
}

exports.User_Role = User_Role;
exports.validate = validateUserRole;