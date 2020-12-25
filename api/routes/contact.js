 const express = require("express");
const { session } = require("passport");
 const router = express.Router();
 const passport = require("passport");

//  Import Contact Model
const ContactUs = require("../model/contact");

router.post("/",(req,res,next)=>{
    const ContactDetail = new ContactUs({
        name:req.body.name,
        email:req.body.email,
        mobile:req.body.mobile,
        message:req.body.message
    })

    ContactDetail
        .save()
        .then((result) =>res.json(result) )
        .catch((err)=>console.log(err));
})

router.get("/", (req,res,next)=>{
    ContactUs.find()
    .select("_id name email mobile message date")
    .then((result) => {
        res.json(result)
    }).catch((err)=>console.log(err))

})

router.delete("/:NewId",(req,res,next)=>{
    const id = req.params.NewId;
    ContactUs.findByIdAndDelete({_id:id})
        .then((result)=>{
            res.json(result);
        })
        .catch((err)=> console.log(err));
})

module.exports = router;