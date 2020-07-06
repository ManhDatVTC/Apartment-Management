const Joi = require('joi');
const mongoose = require('mongoose');
const { user } = require('./user');
const { apartment } = require('./apartment');

const ApartmentBooking = mongoose.model('Apartment_Booking', new mongoose.Schema({
    Apartment: {
        type: apartment,
        required: true
    },
    user: {
        type: user,
        required: true
    }, 
    img_desc: String,
    img_path: String,
}));

function validateApartmentBooking(ApartmentBooking) {
    const schema = {
        apt_code: Joi.string().required(),
        img_path: Joi.string().required()
    }
}

exports.ApartmentBooking = ApartmentBooking;
exports.validate = validateApartmentBooking;