var express = require('express');
const User = require('../models/user');
var router = express.Router();

router.post('/user/profile', async (req, res) => {
  const { name, age, gender, dob, email, userId } = req.body;

  try {
    var dbUser = await User.findById(userId);
    if (!dbUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    dbUser.name = name;
    dbUser.age = age;
    dbUser.gender = gender;
    dbUser.dob = dob;
    dbUser.email = email;

    await dbUser.save();

    res.status(201).json({ message: 'User profile updated successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/user/profile', async (req, res) => {
  try {
    const { userId } = req.query;
    const { name, age, gender, dob, contactNo, email } = req.body;

    await User.findByIdAndUpdate(userId, { name, age, gender, dob, contactNo, email });

    res.status(200).json({ message: 'User profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/user/profile', async (req, res) => {
  const { userId } = req.query;

  const dbUser = await User.findById(userId);

  res.json(dbUser);
});

module.exports = router;