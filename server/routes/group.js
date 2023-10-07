const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const Group = require('../models/group');

router.post('/', async (req, res) => {
    try {
        const { name, members, owner } = req.body;
        const group = new Group({ name, members, owner });

        await group.save();
        res.status(201).json({ message: 'Group created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/params/', async (req, res) => {
    try {
        const { groupId } = req.query;
        const group = await Group.findById(groupId).populate('members', 'name email');

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        res.json(group);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const userId = req.user._id;
        const userGroups = await Group.find({ members: userId });

        res.json(userGroups);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
