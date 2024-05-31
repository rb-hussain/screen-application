import express from "express";
import db from "../db/connection.js";
import multer from "multer";
import { ObjectId } from "mongodb";

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'D:/mern/server/uploads/assets')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post("/asset/create", upload.any(), async (req, res) => {
    try {

      let collection = await db.collection("assets");
      let newDocument = {
        name: req.body.name,
        file_name: req.files[0].path
      };

      console.log(req.files[0])
        
      let result = await collection.insertOne(newDocument);
      req.session.user = result.insertedId;
      console.log(req.session.user);
      res.send(result).status(204);
      
    } catch (err) {
      console.error(err);
      res.status(500).send("Error adding asset");
    }
  });

  // This section will help you get a single record by id
  router.get("/asset/:id", async (req, res) => {
    let collection = await db.collection("assets");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  });

  // This section will help you update a record by id.
router.post("/asset/edit/:id", upload.any(), async (req, res) => {
    try {
      const query = { _id: new ObjectId(req.params.id) };
      const updates = {
        $set: {
          name: req.body.name,
          file_name: req.files[0].path
        },
      };
  
      let collection = await db.collection("assets");
      let result = await collection.updateOne(query, updates);
      res.send(result).status(200);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating record");
    }
  });

  // This section will help you delete a record
router.delete("/asset/delete/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("assets");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

  export default router;