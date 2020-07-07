const { User, validate } = require('../models/user');
const { User_Role } = require('../models/user_role');

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const user = await User.find().sort('name');
    res.send(user);
});

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).send('The user with the given ' + req.params.id + ' was not found.');
    res.send(user);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // User Role
    const userRole = await User_Role.findById(req.body.user_role_id);
    if (!userRole) return res.status(400).send('Invalid user role.');

    // User
    let user = new User({
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password,
        full_name: req.body.full_name,
        date_of_birth: req.body.date_of_birth,
        gender: req.body.gender,
        phone_number: req.body.phone_number,
        role: {
            _id: userRole._id,
            role_code: userRole.role_code,
            desc: userRole.desc
        }
    });
    user = await user.save();
    res.send(user);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // User Role
    const userRole = await User_Role.findById(req.body.user_role_id);
    if (!userRole) return res.status(400).send('Invalid user role.');
    // User
    const user = await User.findByIdAndUpdate(req.params.id, {
        user_name: req.body.apt_name,
        email: req.body.address,
        password: req.body.rooms_count,
        full_name: req.body.bedrooms_count,
        date_of_birth: req.body.bathrooms_count,
        gender: req.body.area,
        phone_number: req.body.phone_number,
        role: {
            _id: userRole._id,
            role_code: userRole.role_code,
            desc: userRole.desc
        }
    }, { new: true });

    if (!user) return res.status(404).send('The user with the given ' + req.body.user_name + ' was not found.');
    res.send(user);
});

router.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);

    if (!user) return res.status(404).send('The user with the given ID was not found.');
    res.send(user);
});

module.exports = router; 