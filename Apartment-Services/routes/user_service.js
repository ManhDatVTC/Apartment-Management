const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');

const { User, validate } = require('../models/user');
const { User_Role } = require('../models/user_role');

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/', async (req, res) => {
    //Kiểm tra sự tồn tại của email.
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    //Kiểm tra thông tin từ User từ Client. 
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Tạo một mảng từ req.body đã có bằng cách lấy ra các properties xác định.
    user = new User(_.pick(req.body,['user_name','email','password','full_name','date_of_birth','gender','phone_number','role_type']))

    //Hash password.
    const salt = await bcrypt.genSalt(10);
    // Auto-gen a salt and hash
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuthToken();
    res.send(user);
    res.header('x-auth-token', token).send_.pick(user,['user_name','email','password','full_name','date_of_birth','gender','phone_number','role_type'])
});

module.exports = router; 