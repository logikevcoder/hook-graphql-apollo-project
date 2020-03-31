const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  picture: String
});

// to create the model itself
module.exports = mongoose.model('User', UserSchema);
