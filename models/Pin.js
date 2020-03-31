const mongoose = require('mongoose');

const PinSchema = new Mongoose.Schema(
  {
    title: String,
    content: String,
    image: String,
    latitude: Number,
    longitude: Number,
    author: { type: mongoose.Schema.ObjectId, ref: 'User' }, // build the User typedef with a special mongoose id ObjectId which will populate the rest of Users fields
    comments: [
      {
        text: String,
        createdAt: { type: Date, default: Date.now },
        author: { type: mongoose.Schema.ObjectId, ref: 'User' }
      }
    ]
  },
  { timeStamp: true } // whenever new pin is created it will give a timestamp
);

// to create the model itself
module.exports = mongoose.model('Pin', PinSchema);
