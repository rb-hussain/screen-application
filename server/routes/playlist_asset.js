import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.post("/playlist_asset/create", async (req, res) => {
    try {

      let collection = await db.collection("playlist_assets");
      console.log(req.body.playlist_id)
      let newDocument = {
        playlist_id: req.body.playlist_id,
        asset_id: req.body.asset_id,
      };
        
      let result = await collection.insertOne(newDocument);
      res.send(result).status(204);
      
    } catch (err) {
      console.error(err);
      res.status(500).send("Error adding playlist_asset");
    }
  });

  // This section will help you get a single record by id
  router.get("/playlist_asset/:id", async (req, res) => {
    let collection = await db.collection("playlist_assets");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  });

  // This section will help you update a record by id.
router.post("/playlist_asset/edit/:id", async (req, res) => {
    try {
      const query = { _id: new ObjectId(req.params.id) };
      console.log(req.body.playlist_id)
      const updates = {
        $set: {
            playlist_id: req.body.playlist_id,
            asset_id: req.body.asset_id,
        },
      };
  
      let collection = await db.collection("playlist_assets");
      let result = await collection.updateOne(query, updates);
      res.send(result).status(200);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating record");
    }
  });

  // This section will help you delete a record
router.delete("/playlist_asset/delete/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("playlist_assets");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

  export default router;