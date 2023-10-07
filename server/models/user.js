const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  age: Number,
  gender: String,
  dob: Date,
  mobileNumber: {
    type: String,
    unique: true,
  },
  email: String,
  otpCode: Number,
  otpExpiration: Date,
});

module.exports = User = mongoose.model("User", UserSchema);
