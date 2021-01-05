const mongoose = require("mongoose");

const SliderScheema = mongoose.Schema({
    sliderImg:{type:String, required:true},
    sliderHead:{type:String, required:true},
    sliderInfo:{type:String, required:true}, 
})

module.exports = mongoose.model("Slider",SliderScheema);