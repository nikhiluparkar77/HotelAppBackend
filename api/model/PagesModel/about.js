const mongoose =  require("mongoose"); 

const AboutSchema = mongoose.Schema({
    heading:{
        type:String
    },
    aboutHotel:[{ 
        aboutHeading:{type:String},
        aboutText:{type:String}, 
    }],
    aboutImage:[{ 
        aboutHeading:{type:String}, 
    }],    
    aboutNews:[{ 
        NewsHeading:{type:String}, 
        aboutText:{type:String}, 
    }],
    News:[{ 
        NewsImage:{type:String}, 
        Head:{type:String}, 
        newsText:{type:String},
        NewsDate:{ type: Date, default: Date.now } 
    }],
    ReviewHeading:[{
        Head:{type:String}, 
    }],
    ClientReview:[{ 
        Review:{type:String}, 
        Name:{type:String}, 
        Post:{type:String},
        NewsDate:{ type: Date, default: Date.now } 
    }]
})

module.exports = mongoose.model("About",AboutSchema);