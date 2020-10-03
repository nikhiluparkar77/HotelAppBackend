const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// Hotel Model
const HotelDatails = require("../model/Hotel");

router.post("/", (req, res, next) => {
  const hotel = {};
  hotel.roomImage = req.body.roomImage;
  hotel.roomNumber = req.body.roomNumber;
  hotel.price = req.body.price;
  hotel.avilableDate = req.body.avilableDate;
  hotel.bookingDate = req.body.bookingDate;
  hotel.purpose = req.body.purpose;

  HotelDatails.find()
    .then((info) => {
      new HotelDatails(hotel).save().then((response) => {
        res.json(response);
      });
    })
    .catch((err) => res.status(500).json(err));
});

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Connected",
  });
});

module.exports = router;
