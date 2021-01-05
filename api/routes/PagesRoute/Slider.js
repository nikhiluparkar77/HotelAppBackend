const express = require("express");
const passport = require("passport");
const router  = express.Router();


// Import Model
const Slider = require("../../model/PagesModel/Slider");

// Add Information
router.post("/",(req,res,next)=>{
    const slider = Slider({
        sliderImg:req.body.sliderImg,
        sliderHead:req.body.sliderHead,
        sliderInfo:req.body.sliderInfo
    })
    slider
        .save()
        .then((result)=> res.json(result))
        .catch((err)=> console.log(err));
})

// Get Information
router.get("/",(req,res,next)=>{
    Slider
        .find()
        .select("_id sliderImg sliderHead sliderInfo")
        .then((result)=> res.json(result))
        .catch((err)=> console.log(err));
})

// Edit Information
router.patch("/:SId",(req,res,next)=>{
    const Id = req.params.SId;
    Slider
        .findOneAndUpdate(
                {_id:Id},
                {
                    $set:{
                        sliderImg:req.body.sliderImg,
                        sliderHead:req.body.sliderHead,
                        sliderInfo:req.body.sliderInfo
                    }
                }
            ) 
        .then((result)=> res.json(result))
        .catch((err)=> console.log(err));
})

// Delete Information
router.delete("/:SId",(req,res,next)=>{
    const Id = req.params.SId;
    Slider
        .findByIdAndDelete({_id:Id})
        .then((result)=>res.json(result))
        .catch((err)=>console.log(err));
})

module.exports = router;