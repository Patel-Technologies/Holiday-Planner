const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TripSchema = new Schema({
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    goingDate: Date,
    returnDate: Date,
    sourceCity: String,
    destinationCity: String,
    modeOfTravel: String,
    hotelPreferences: String,
    tripName: String,
    budget: Number,
});

module.exports = mongoose.model("Trip", TripSchema);
