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
const HotelData = require('./apis/hotel');
const TravelData = require('./apis/travel');
const authenticateUser = require('./middleware/authenticateUser');
const trip = require('./routes/trips');
const Trip = require('./models/trip');
const Group = require('./models/group');
const User = require('./models/user');
const BookedTrip = require('./models/bookedTrip');
const app = express();
app.use(bodyParser.json());
require('dotenv').config();
const plivo = require('plivo');

const plivoClient = new plivo.Client(
  process.env.PLIVO_AUTH_ID,
  process.env.PLIVO_AUTH_TOKEN
);

const uri = "mongodb+srv://patidar:patel@holidayplanner.9zrhsjn.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri).then(
  () => { console.log('Database connection is successful') },
  err => { console.log('Error when connecting to the database' + err) }
);

app.use('/api', register);

app.use('/api', login);

app.use('/api/groups', group);

app.use('/api/user/profile', profile);

app.use('/api/', search);

app.use('/api/groups', trip);

app.get('/api/tripBookedData', async (req, res) => {
  const tripId = req.query.tripId;
  const bookedData = await BookedTrip.find({ tripId });
  res.json(bookedData);
});

const getTripsForExpenseCheck = async () => {

  const tripsNeedingCheck = await Trip.find({ boolFind: false });

  return tripsNeedingCheck;
}

const calculateTotalExpensesForTrip = async (tripId) => {

  const trip = await Trip.findById(tripId);

  const { sourceCity, destinationCity, hotelPreferences, modeOfTravel } = trip;
  const result = [];
  const groupDetail = await Group.findById(trip.groupId);
  const noOfPeopleInGroup = groupDetail.members?.length;

  await HotelData.forEach(async (hotel) => {
    if (hotel.mainCity == destinationCity && hotelPreferences <= hotel.starRating) {
      await TravelData.forEach((travel) => {
        if (travel.sourceCity == sourceCity && travel.destCity == destinationCity && travel.modeOfTravel == modeOfTravel) {
          if (trip.budget >= (hotel.costPerNightPerPerson + travel.price) * noOfPeopleInGroup) {
            result.push({ hotel, travel, total: (hotel.costPerNightPerPerson + travel.price) * noOfPeopleInGroup });
          }
        }
      })
    }
  });

  console.log(result)

  if (result.length == 0) {
    return false;
  }

  const bookedTrip = new BookedTrip({
    groupId: trip.groupId,
    tripId: trip._id,
    goingDate: trip.goingDate,
    returnDate: trip.returnDate,
    sourceCity: trip.sourceCity,
    destinationCity: trip.destinationCity,
    modeOfTravel: trip.modeOfTravel,
    hotelPreferences: trip.hotelPreferences,
    tripName: trip.tripName,
    budget: trip.budget,
    journeyDetails: result
  });

  await bookedTrip.save();

  return true;
}

const sendBudgetExceededNotification = async (tripId) => {

  const trip = await Trip.findById(tripId);
  const group = await Group.findById(trip.groupId);

  const { members, owner } = group;

  members.forEach(async (memberId) => {

    const member = await User.findById(memberId);

    const message = `We have found a ${trip.tripName} trip for you under ${trip.budget} budget. Please check your Holiday Planner app for more details.`;
    plivoClient.messages.create({
      src: "+917046087556",
      dst: member.mobileNumber,
      text: message,
    })
  });

  const ownerId = await User.findById(owner);

  const message = `We have found a ${trip.tripName} trip for you under ${trip.budget} budget. Please check your Holiday Planner app for more details.`;

  plivoClient.calls.create(
    "+917046087556", // from
    ownerId.mobileNumber, // to
    "https://s3.amazonaws.com/static.plivo.com/answer.xml", // answer url
    {
      answerMethod: "GET",
    },
    time_limit = 20000
  ).then(function (response) {
    console.log(response);
    plivoClient.calls.speakText(
      response.requestUuid, // call uuid
      "Hello World", // text
    ).then(function (response) {
      console.log(response);
    }, function (err) {
      console.error(err);
    });
  }, function (err) {
    console.error(err);
  });
}

const intervalMinutes = 5;
setInterval(async () => {

  const tripsNeedingCheck = await getTripsForExpenseCheck();

  for (const trip of tripsNeedingCheck) {
    const isWithinBudget = await calculateTotalExpensesForTrip(trip._id);

    if (isWithinBudget) {
      await sendBudgetExceededNotification(trip._id);

      await Trip.findByIdAndUpdate(trip._id, { boolFind: true });
    }
  }
}, intervalMinutes * 1000);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
