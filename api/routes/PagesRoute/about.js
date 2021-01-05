const { compareSync } = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const about = require("../../model/PagesModel/about");
const router = express.Router();

// Import Module
const About = require("../../model/PagesModel/about");


// Add About 
router.post("/",
    (req,res,next)=>{ 
        const AboutHead = About({
            AboutHeading:req.body.AboutHeading
        })
        AboutHead
            .save()
            .then((result) => res.json(result))
            .catch((err)=> console.log(err));
    }
)

// Get About Data
router.get("/",
    (req,res,next)=>{  
        About
            .find() 
            .select("_id AboutHeading review")
            .then((result) => res.json(result))
            .catch((err)=> console.log(err));
    }
)

// Add Review 
router.post("/review",
    (req,res,next)=>{ 
        About.findOne()   
        .then((about) => { 
                const AddReview = {
                    Review:req.body.Review,
                    ClientName:req.body.ClientName,
                    ClientImage:req.body.ClientImage 
                }
                about.review.unshift(AddReview);
                about
                    .save()
                    .then((result) => res.json(result))
                    .catch((err)=> console.log(err)) 
        })
        .catch((err)=> console.log(err))
    }
)



// Edit review
router.patch("/review/:Id",
    (req,res,next) =>{
        const id = req.params.Id;
        About.findByIdAndUpdate(
            {_id:id},
            {
                $set:{
                    review:[
                        {
                            Review:req.body.Review,
                            ClientName:req.body.ClientName,
                            ClientImage:req.body.ClientImage  
                        }
                    ]
                }
            }
            
        )
        .then((result)=> res.json(result))
        .catch((err) => console.log(err));
    }
)

 
// Delete Review
//  router.delete("/review/:Id",
//     (req,res,next) =>{
//         const id = req.params.Id;
//         About.findById(id)
//             .then((about)=>{
//                 const removeIndex =  about.clientReview.map((item) => {
//                     item._id
//                   });
//                   about.clientReview.splice(removeIndex,1);
//                   about.save()
//                     .then((result)=>res.json(result))
                    
//             })
//             .catch((err)=>console.log(err))
//     }
// )

router.delete(
    "/review/:RId",  
    (req, res, next) => {
      const id = req.params.RId;
      About.findById({_id:id})
        .then((about) => {
          const removeIndex = about.review.map((item) => {
            item._id;
          });
          about.review[0].splice(removeIndex, 1);
          return about.save().then((result) => {
            res.status(200).json(result);
          });
        })
        .catch((err) => console.log(err));
    }
  );

 


module.exports = router;