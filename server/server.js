import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import users from "./routes/user.js";
import assets from "./routes/asset.js";
import playlists from "./routes/playlist.js";
import playlist_assets from "./routes/playlist_asset.js";
import session from "express-session";
//import passport from "passport";
//import cookieSession from "cookie-session";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(express.json());
app.use("/record", records);
app.use("", users);
app.use("", assets);
app.use("", playlists);
app.use("", playlist_assets);


// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});