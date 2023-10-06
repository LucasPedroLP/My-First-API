const express = require("express");
const router = express.Router();
const data = require("../data");

function clearDB(time) {
  console.log("DB will be cleared");
  setTimeout(() => {
    data.clearDB();
    console.log("DB Clear");
  }, time);
}

router.get("/", (req, res, next) => {
  var currentDB = data.getDB();
  var isFull = currentDB.length > 500;
  if (isFull) {
    clearDB(10000);
  }
  var json = {
    totalHits: currentDB.length,
    isFull: isFull,
    DB: currentDB,
  };

  json = data.cleanData(json);

  res.status(200).json(json);
});

router.post("/", (req, res, next) => {
  for (let i = 0; i < 500; i++) {
    data.setDB({
      timeStamp: new Date().toUTCString(),
      message: req.body.message,
    });
  }

  res.status(200).json({
    message: "Handling POST requests",
    message: req.body.message,
  });
});

module.exports = router;
