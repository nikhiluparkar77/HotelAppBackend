const express = require( "express" );
const mongoose = require( "mongoose" );
const gravatar = require( "gravatar" );
const bcrypt = require( "bcrypt" ); 
const jwt = require( "jsonwebtoken" );
const passport = require( "passport" );
const router = express.Router();
const keys = require( "../config/keys" );

// User Model
const User = require( "../model/user" );

// SignUp
router.post( "/signup", ( req, res, next ) => {
    User.findOne( { email: req.body.email } )
        .then( ( user ) => {
            if ( user ) {
                return res.status( 400 ).json( { message: "Email Already Avilable" } );
            } else {
                const avatar = gravatar.url( req.body.email, {
                    s: "200", // size
                    r: "pg", // reting
                    d: "mm", // default
                } );

                const user = new User( {
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password,
                } );

                bcrypt.genSalt( 10, ( err, salt ) => {
                    bcrypt.hash( user.password, salt, ( err, hash ) => {
                        if ( err ) throw err;
                        user.password = hash;
                        user.save().then( ( user ) => res.json( user ) )
                            .catch( ( err ) => console.log( err ) );
                    } );
                } );
            }
        } );
} );



// SignIn

router.post( "/signin", ( req, res, next ) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne( { email } )
        .then( ( user ) => {
            if ( !user ) {
                res.status( 400 ).json( {
                    message: "User Not Found",
                } );
            }

            bcrypt.compare( password, user.password )
                .then( ( Match ) => {
                    if ( Match ) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        };
                        jwt.sign( payload, keys.secretOrKey,
                            { expiresIn: 5600 }, ( err, token ) => {
                                res.json( {
                                    message: "Login Successfully",
                                    token: "Bearer " + token,
                                } );
                            } );
                    } else {
                        return res.status( 400 ).json( {
                            message: "Passowrd Incorrect",
                        } );
                    }
                } ).catch( ( err ) => console.log( err ) );
        } );
} );


router.get( "/userinfo", passport.authenticate( "jwt", { session: false } ),
    ( req, res, next ) => {
        User.find().then( ( user ) => {
            res.json( user );
        } ).catch( ( err ) => console.log( err ) );
    } );


module.exports = router;