import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.post("/playlist/create", async (req, res) => {
    try {

      let collection = await db.collection("playlists");
      console.log(req.body.name)
      let newDocument = {
        name: req.body.name
      };
        
      let result = await collection.insertOne(newDocument);
      req.session.user = result.insertedId;
      res.send(result).status(204);
      
    } catch (err) {
      console.error(err);
      res.status(500).send("Error adding playlist");
    }
  });

  // This section will help you get a single record by id
  router.get("/playlist/:id", async (req, res) => {
    let collection = await db.collection("playlists");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  });

  // This section will help you update a record by id.
router.post("/playlist/edit/:id", async (req, res) => {
    try {
      const query = { _id: new ObjectId(req.params.id) };
      console.log(req.body.name)
      const updates = {
        $set: {
          name: req.body.name
        },
      };
  
      let collection = await db.collection("playlists");
      let result = await collection.updateOne(query, updates);
      res.send(result).status(200);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating record");
    }
  });

  // This section will help you delete a record
router.delete("/playlist/delete/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("playlists");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

  export default router;