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
const productRoutes = require("./api/routes/products");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Logging
app.use(morgan("dev"));

app.use("/products", productRoutes);

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

// app.use((req, res, next) => {
//   res.status(200).json({
//     message: "it works!",
//   });
// });

module.exports = app;
