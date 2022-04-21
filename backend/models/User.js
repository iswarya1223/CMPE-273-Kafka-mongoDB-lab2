const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  uname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  dateofbirth:{
    type: Date
  },
  picture: {
    type: String
  },
  mobile:{
    type: Number
  },
  city:{
    type: String,
  },
  country:{
    type: String
  },
  address: {
    type: String,
  },
  shopname: {
    type: String, 
    ref: 'product',

  },
  shopimage: {
    type: String,
  },
});

module.exports = mongoose.model('user', UserSchema);