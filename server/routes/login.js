var express = require('express');
const User = require('../models/user');
var router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    try {
        const { mobileNumber, otpCode } = req.body;

        const user = await User.findOne({ mobileNumber });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const now = new Date();
        if (user.otpCode !== otpCode || user.otpExpiration < now) {
            return res.status(401).json({ message: 'Invalid or expired OTP code' });
        }

        user.otpCode = '';
        user.otpExpiration = null;
        await user.save();

        const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
