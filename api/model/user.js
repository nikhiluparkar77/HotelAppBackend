const mongoose = require( 'mongoose' );

const UserSchema = mongoose.Schema( {
    name: {
        type: "String",
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    playlist: [
        {
            sondId: {
                type: String,
            }
        }
    ]
} );

module.exports = mongoose.model( "User", UserSchema );