const mongoose = require("mongoose");

const ContactScheema = mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    mobile:{
        type:Number,
        required:true
    },
    message:{
        type:String
    },
    date: {
        type: Date,
        default: Date.now,
    },
})
module.exports = mongoose.model("ContactUs",ContactScheema);