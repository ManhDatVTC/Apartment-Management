const Joi = require('joi');
const mongoose = require('mongoose');
const { Apartment_Building } = require('./apartmet_building');

const Apartment = mongoose.model('Apartments', new mongoose.Schema({
    apt_name: String,
    address: String,
    rooms_count: Number,
    bedrooms_count: Number,
    bathrooms_count: Number,
    area: Number,
    area_builtin: Number,
    elavator: Boolean,
    direction: String,
    price: Number,
    price_rent: Number,
    apt_desc: String,
    apt_status: Number,
    stype_code: Number,
    apartment_building: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apartment_Building',
        required: true
    },
    apartment_img: Array
}));

function validateApartment(apartment) {
    const schema = Joi.object({
        apt_name: Joi.string().required(),
        address: Joi.string().required()
    });
    return Joi.validate(apartment, schema, {allowUnknown:true});
}

exports.Apartment = Apartment;
exports.validate = validateApartment;

