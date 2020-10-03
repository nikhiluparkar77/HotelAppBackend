const jwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Admin = mongoose.model("Admin");
const keys = require("./keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
  passport.use(
    "User",
    new jwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id).then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );

  passport.use(
    "Admin",
    new jwtStrategy(opts, (jwt_payload, done) => {
      Admin.findById(jwt_payload.id).then((admin) => {
        if (admin) {
          return done(null, admin);
        } else {
          return done(null, false);
        }
      });
    })
  );

  passport.serializeUser((entity, done) => {
    done(null, { id: entity.id, type: entity.type });
  });

  passport.deserializeUser((obj, done) => {
    switch (obj.type) {
      case "Admin":
        Admin.findById(obj.id).then((admin) => {
          if (admin) {
            return done(null, admin);
          } else {
            return done(new Error("Admin id not found" + obj.id, null));
          }
        });
        break;
      case "User":
        User.findById(obj.id).then((user) => {
          if (user) {
            return done(null, user);
          } else {
            return done(new Error("User id not found" + obj.id, null));
          }
        });
    }
  });
};
