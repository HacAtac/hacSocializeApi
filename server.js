const express = require("express");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static("public"));

app.use(require("./routes"));

dotenv.config();
connectDB();

//connect to mongoose db
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true, //use this to avoid deprecation warning when using mongoose 5.x and above
// });

// Use this to log mongo queries being executed
mongoose.set("debug", true);

app.listen(PORT, () =>
  console.log(`HacAtac Connected on localhost:${PORT} <(^_^)>`.brightGreen)
);
