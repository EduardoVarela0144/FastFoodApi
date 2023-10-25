const mongoose = require("mongoose");

const MONGO_DB_URI =
  process.env.MONGODB_URI || "mongodb+srv://root:e2ohKf9svYZOvzr5@cluster0.yxpnbqw.mongodb.net/";

mongoose
  .connect(MONGO_DB_URI, {})
  .then((db) => console.log("Conected! "+ db.connection.host))
  .catch((err) => console.log(err));
