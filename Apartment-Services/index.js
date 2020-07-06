const mongoose = require('mongoose');

const Apartment = require('./routes/apartment_service');
const Apartment_Building = require('./routes/apartmet_building_service');

const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/Apartment-Management',{ useNewUrlParser: true,useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...', err));

app.use(express.json());
app.use('/api/apartment', Apartment);
app.use('/api/apartment_building', Apartment_Building);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));