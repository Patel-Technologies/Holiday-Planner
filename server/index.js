const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const register = require('./routes/register');
const login = require('./routes/login');
const profile = require('./routes/profile');
const group = require('./routes/group');
const search = require('./routes/search');
const authenticateUser = require('./middleware/authenticateUser');
const trip = require('./routes/trips');

const app = express();
app.use(bodyParser.json());

const uri = "mongodb+srv://patidar:patel@holidayplanner.9zrhsjn.mongodb.net/?retryWrites=true&w=majority";

// Connect to MongoDB (you should have your MongoDB connection URI here)
mongoose.connect(uri).then(
  () => { console.log('Database connection is successful') },
  err => { console.log('Error when connecting to the database' + err) }
);

// Register a new user
app.use('/api',register);

// User Login
app.use('/api',login);

// Groups
app.use('/api/groups', group);

// User Profile
app.use('/api/user/profile', profile);

app.use('/api/', search);

app.use('/api/groups', trip);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
