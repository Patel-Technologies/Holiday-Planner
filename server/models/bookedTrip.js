const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookedTripSchema = new Schema({
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
    goingDate: Date,
    returnDate: Date,
    sourceCity: String,
    destinationCity: String,
    modeOfTravel: String,
    hotelPreferences: String,
    tripName: String,
    budget: Number,
    journeyDetails: [
        {
            travel: {
                sourceCity: String,
                destCity: String,
                modeOfTravel: String,
                price: Number,
                travelCompanyName: String,
                bookingAppName: String,
            },
            hotel: {
                hotelName: String,
                address: String,
                costPerNightPerPerson: Number,
                starRating: Number,
                amenities: [String],
                mainCity: String,
            },
            total: Number
        },
    ],
});

module.exports = mongoose.model("BookedTrip", BookedTripSchema);
