var mongoose = require('mongoose');

var AirportSchema = new mongoose.Schema({
  country: String,
  state: String,
  city: String,
  airport_code: String,
  airport_name: String
});

module.exports = mongoose.model('Airport', AirportSchema);
