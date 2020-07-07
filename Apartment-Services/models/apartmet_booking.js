const Joi = require('joi');
const mongoose = require('mongoose');
const { user } = require('./user');
const { apartment } = require('./apartment');

const ApartmentBooking = mongoose.model('Apartment_Booking', new mongoose.Schema({
    apartment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'apartment',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    desc: String,
}));

function validateApartmentBooking(ApartmentBooking) {
    const schema = {
        apartment: Joi.string().required(),
        user: Joi.string().required()
    }
    return Joi.validate(ApartmentBooking, schema, { allowUnknown: true });
}

exports.ApartmentBooking = ApartmentBooking;
exports.validate = validateApartmentBooking;