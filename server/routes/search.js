var express = require('express');
const User = require('../models/user');
var router = express.Router();

router.post('/search/user', async (req, res) => {
  try {
    const { search } = req.body;
    const users = await User.find({ $or: [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }] });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
