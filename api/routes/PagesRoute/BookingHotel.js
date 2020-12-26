const express = require("express"); 
const passport = require("passport");
const router = express.Router();

// Import model
const BookingHotel = require("../../model/PagesModel/BookingHotel");

// Add Info 
router.post("/",
    passport.authenticate("Admin",{session:false}),
    (req,res,next)=>{
        const bookingHotel = BookingHotel({
            RoomImage:req.body.RoomImage,
            RoomNo:req.body.RoomNo,
            RoomHead:req.body.RoomHead,
            RoomPrice:req.body.RoomPrice,
            RoomeDate:req.body.RoomeDate,
            RoomeAvilable:req.body.RoomeAvilable
        })

        bookingHotel.save()
        .then((result)=> res.json(result))
        .catch((err)=> console.log(err));
    }
)

// Get Info
router.get("/", 
    (req,res,next)=>{
        BookingHotel.find()
        .select("_id RoomImage RoomNo RoomHead RoomPrice RoomeDate RoomeAvilable")
        .then((result)=> res.json(result))
        .catch((err)=> console.log(err));
    }
)

// Edit Info
router.patch("/:BookingId",
    passport.authenticate("Admin",{session:false}),
    (req,res,next)=>{
        const id = req.params.BookingId;
        BookingHotel
            .findOneAndUpdate(
                    {_id:id},
                    {
                        $set:{
                                RoomImage:req.body.RoomImage,
                                RoomNo:req.body.RoomNo,
                                RoomHead:req.body.RoomHead,
                                RoomPrice:req.body.RoomPrice,
                                RoomeDate:req.body.RoomeDate,
                                RoomeAvilable:req.body.RoomeAvilable
                        } 
                    }
                )
                .exec()
                .then((result)=> res.json(result))
                .catch((err)=>console.log(err));
    }
)

// Delete Info
router.delete("/:BookingId",
    passport.authenticate("Admin",{session:false}),
    (req,res,next)=>{
        const id = req.params.BookingId;
        BookingHotel
            .findByIdAndDelete({_id:id})
                .then((result)=>res.json(result))
                .catch((err)=>console.log(err));
    }
)

module.exports = router;