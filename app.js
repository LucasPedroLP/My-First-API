const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

// Handling CORS
app.use((req, res, next) => {
  res.header("Acess-Control-Allow-Origin", "*");
  res.header(
    "Acess-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Acess-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//Route request
const messageRoutes = require("./routes/message");
const botRoutes = require("./routes/bot");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Logging
app.use(morgan("dev"));

//Routing
app.use("/message", messageRoutes);
app.use("/postUtterance", botRoutes);

// Error handling
app.use((req, res, next) => {
  const error = new Error("not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
