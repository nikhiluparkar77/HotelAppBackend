const mongoose = require("mongoose");

const BookTableSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    mobileNo:{type:Number,required:true},
    tableNo:{type:Number,required:true},
    date:{type:Date, default:Date.now},
    booked:{type:Boolean}
})

module.exports = mongoose.model("BookingTable", BookTableSchema);