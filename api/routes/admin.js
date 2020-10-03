const express = require("express");
const mongoose = require("mongoose");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../config/keys");
const router = express.Router();

// Admin Model
const Admin = require("../model/admin");

// Admin Sign Up Router
router.post("/SignUp", (req, res, next) => {
  Admin.findOne({ email: req.body.email }).then((admin) => {
    if (admin) {
      return res.status(400).json({ message: "Email Already Exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      const newAdmin = Admin({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
          if (err) throw err;
          newAdmin.password = hash;
          newAdmin
            .save()
            .then((admin) => res.json(admin))
            .catch((err) => {
              res.status(500).json(err);
            });
        });
      });
    }
  });
});

// Admin Sign In Router
router.post("/SignIn", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  Admin.findOne({ email })
    .then((admin) => {
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      bcrypt.compare(password, admin.password).then((isMatch) => {
        if (isMatch) {
          const payload = {
            id: admin.id,
            name: admin.name,
            avatar: admin.avatar,
          };

          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 5800 },
            (err, token) => {
              res.json({
                message: "Login Successfully",
                token: "Bearer " + token,
              });
            }
          );
        } else {
          return res.status(400).json({ message: "Password incorrect" });
        }
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Admin Dalate Router
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    const id = req.params.id;
    Admin.remove({ id })
      .then((admin) => {
        res.json(admin);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

// Login Admin Details Router
router.get(
  "/",
  passport.authenticate("Admin", { session: false }),
  (req, res, next) => {
    Admin.find()
      .then((admin) => {
        res.json(admin);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

module.exports = router;
