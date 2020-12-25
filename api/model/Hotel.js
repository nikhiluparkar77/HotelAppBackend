const mongoose = require("mongoose");

const HotelSchema = mongoose.Schema({
  roomImage: {
    type: String,
    required: true,
  }, 
  roomNumber: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  avilableDate: {
    type: Date,
  },
  bookingDate: {
    type: Date,
  },
  purpose: {
    type: String,
  },
});

module.exports = mongoose.model("HotelDatails", HotelSchema);
