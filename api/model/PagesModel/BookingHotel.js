const mongoose = require("mongoose");

const BookingHotelScheema = mongoose.Schema({
    RoomImage:{
        type:String,
        required:true
    },
    RoomNo:{
        type:Number,
        required:true
    },
    RoomHead:{
        type:String,
        required:true
    },   
    RoomPrice:{
        type:Number,
        required:true
    },
    RoomeDate:{
        type:Date, 
    },
    RoomeAvilable:{
        type:Boolean, 
    }
})

module.exports = mongoose.model("BookingHotel",BookingHotelScheema);