const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  MobileNumber: {
    type: Number,
    required: true,
  },
  RoomBookings: [
    {
      purpose: { type: String },
      room: { type: String },
      StartDate: { type: Date },
      EndDate: { type: Date },
      price: { type: Number },
    },
  ],
  ServiceBookings: [
    {
      ServiceId: { type: mongoose.Schema.Types.ObjectId },
    },
  ],
  BookTable: [
    {
      table: { type: mongoose.Schema.Types.ObjectId },
    },
  ],
});

module.exports = mongoose.model("Profile", ProfileSchema);
