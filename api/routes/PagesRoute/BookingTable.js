const express = require("express");
const passport = require("passport");
const router = express.Router();

// Booking Table model import
const BookingTable = require("../../model/PagesModel/BookingTable");

// Post bookingTable Api 
router.post("/",
    (req,res,next) =>{
        const tableBooked = new BookingTable({
            name:req.body.name,
            email:req.body.email,
            mobileNo:req.body.mobileNo,
            tableNo:req.body.tableNo,
            date:req.body.date,
            booked:req.body.booked
        })
        tableBooked
            .save()
            .then((result) => res.json(result))
            .catch((err)=> console.log(err));
    }
)

// Get bookingTable Api 
router.get("/",
    passport.authenticate("Admin",{session:false}),
    (req,res,next)=>{
        BookingTable
            .find()
            .select("_id name email mobileNo tableNo date booked")
            .then((result)=> res.json(result))
            .catch((err) => console.log(err));  
    }
)

// Get Slingle bookingTable Api 
router.get("/:tableId",
    passport.authenticate("Admin",{session:false}),
    (req,res,next)=>{
        const Id = req.params.tableId;
        BookingTable
            .findById({_id:Id})
            .select("_id name email mobileNo tableNo date booked")
            .then((result)=> res.json(result))
            .catch((err) => console.log(err));  
    }
)

// Edit bookingTable Api 
router.patch("/:tableId",
    passport.authenticate("Admin",{session:false}),
    (req,res,next)=>{
        const Id = req.params.tableId;
        BookingTable
            .findByIdAndUpdate(
                    {_id:Id},
                    {
                        $set:{
                            name:req.body.name,
                            email:req.body.email,
                            mobileNo:req.body.mobileNo,
                            tableNo:req.body.tableNo,
                            date:req.body.date,
                            booked:req.body.booked
                        }
                    }
                )
                .then((result)=> res.json(result))
                .catch((err)=>console.log(err));
    }
)

// Delete bookingTable Api 
router.delete("/:tableId",
    passport.authenticate("Admin",{session:false}),
    (req,res,next)=>{
        const Id = req.params.tableId;
        BookingTable
            .findByIdAndDelete({_id:Id})
            .then((result)=>res.json(result))
            .catch((err)=>console.log(err))
    }
)

module.exports = router;