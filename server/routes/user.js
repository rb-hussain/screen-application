import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

import multer from "multer";

import bcrypt from "bcryptjs";

import passport from "passport";

//var bcrypt = require('bcryptjs');

// This help convert the id from string to ObjectId for the _id.
//import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'D:/mern/server/uploads/users')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// This section will help you create a new record.
router.post("/register", upload.any(), async (req, res) => {
    try {

      let collection = await db.collection("users");
      let email = req.body.email;
      let user = await collection.findOne({email});
      if(user) {
        res.status(500).send("User already exists...");
      } else {
        let password = await bcrypt.hash(req.body.password, 8);
        let newDocument = {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          password: password,
          avatar: req.files[0].path
        };
        
        let result = await collection.insertOne(newDocument);
        req.session.user = result.insertedId;
        console.log(req.session.user);
        res.send(result).status(204);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error adding user");
    }
  });

  router.post("/login", upload.any(), async (req, res) => {
    try {
      let collection = await db.collection("users");
      let {email, password} = req.body;
      let user = await collection.findOne({email});
      if(user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch) {
          req.session.user = user._id;
          console.log(req.session.user);
          res.send(user).status(204);
        } else {
          res.status(500).send("Password Mismatched");
        }
      } else {
        res.status(500).send("User not found");
      }
    } catch (error) {
      res.status(500).send("Error in login");
    }
  });

  router.get("/is_logged_in", async (req, res) => {
    if(req.session.user) {
      return res.json({
        auth: true,
        message: 'signed in'
      });
    } else {
      return res.json({
        auth: false,
        message: 'not signed in'
      });
    }
  });

  router.get("/logout", async (req, res) => {
    if(req.session.user) {
      req.session.destroy(function(err) {
        return res.json({
          auth: false,
          message: 'logged out'
        });
      });
    } else {
      return res.json({
        auth: false,
        message: 'already logged out'
      });
    }
  });

export default router;
