var express = require('express');
const User = require('../models/user');
const router =  express.Router();
const bcrypt = require('bcrypt');
// const plivo = require('plivo');

// const plivoClient = new plivo.Client({
//     authId: 'YOUR_PLIVO_AUTH_ID',
//     authToken: 'YOUR_PLIVO_AUTH_TOKEN',
//   });

function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

router.post('/register', async (req, res) => {
    try {
        const { mobileNumber } = req.body;
    
        if(!mobileNumber) {
            return res.status(400).json({ message: 'Mobile number is required' });
        }

        const existingUser = await User.findOne({ mobileNumber });
    
        if (existingUser && existingUser.otpCode !== null) {
          return res.status(400).json({ message: 'User already loggedIn' });
        }
    
        const otpCode = generateOTP();
    
        const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);

        if(!existingUser) {
        const newUser = new User({ mobileNumber, otpCode, otpExpiration });
        await newUser.save();
        } else {
            existingUser.otpCode = otpCode;
            existingUser.otpExpiration = otpExpiration;
            await existingUser.save();
        }
    
        const message = `Your OTP code is: ${otpCode}`;
        // plivoClient.messages.create({
        //   src: 'YOUR_PLIVO_PHONE_NUMBER', // Your Plivo phone number
        //   dst: mobileNumber, // User's mobile number
        //   text: message,
        // });
    
        res.status(201).json({ message: 'OTP sent for verification' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
});

module.exports = router;
