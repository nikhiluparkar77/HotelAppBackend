const mongoose =  require("mongoose"); 

const AboutSchema = mongoose.Schema({
    AboutHeading:{
        type:String,
    },
    review:[
        {
            Review:{
                type:String,
                required:true
            },
            ClientName:{
                type:String,
                required:true
            },
            ClientImage:{
                type:String,
                required:true
            },
        }
    ]
})

module.exports = mongoose.model("About",AboutSchema);