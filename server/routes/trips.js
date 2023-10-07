const express = require('express');
const router = express.Router();
const Trip = require('../models/trip');

router.post('/trips', async (req, res) => {
  try {
    const {groupId} = req.query;
    const {
      goingDate,
      returnDate,
      sourceCity,
      destinationCity,
      modeOfTravel,
      hotelPreferences,
      tripName,
      budget,
    } = req.body;

    const trip = new Trip({
      groupId,
      goingDate,
      returnDate,
      sourceCity,
      destinationCity,
      modeOfTravel,
      hotelPreferences,
      tripName,
      budget,
    });

    await trip.save();
    res.status(201).json({ message: 'Trip created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/trips', async (req, res) => {
  try {
    const {groupId} = req.query;

    const groupTrips = await Trip.find({ groupId });

    res.json(groupTrips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/tripDetail/', async (req, res) => {
  try {
    const {tripId} = req.query;
    const trip = await Trip.findById(tripId).populate('groupId', 'name members');

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/trip/', async (req, res) => {
  try {
    const {tripId} = req.query;
    const {
      goingDate,
      returnDate,
      sourceCity,
      destinationCity,
      modeOfTravel,
      hotelPreferences,
      tripName,
      budget,
    } = req.body;

    await Trip.findByIdAndUpdate(tripId, {
      goingDate,
      returnDate,
      sourceCity,
      destinationCity,
      modeOfTravel,
      hotelPreferences,
      tripName,
      budget,
    });

    res.status(200).json({ message: 'Trip updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/trips/', async (req, res) => {
  try {
    const {tripId} = req.query;
    await Trip.findByIdAndDelete(tripId);

    res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
