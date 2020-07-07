const { Apartmet_Booking, validate } = require('../models/apartmet_booking');
const { Apartment } = require('../models/apartment');
const { User } = require('../models/user');

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();