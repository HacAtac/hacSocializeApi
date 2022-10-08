const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const path = require("path");
const hpp = require("hpp");
const connectDB = require("./config/db.js");
const app = express();
const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static("public"));

//init middlewares
//sanitize data
app.use(mongoSanitize({}));
//prevent XSS attacks
app.use(xss());
//prevent http paramter pollution
app.use(hpp());

app.use(require("./routes"));

dotenv.config();
connectDB();

// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("/*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// Use this to log mongo queries being executed
mongoose.set("debug", true);

app.listen(PORT, () =>
  console.log(`HacAtac Connected on localhost:${PORT} <(^_^)>`.brightGreen)
);
