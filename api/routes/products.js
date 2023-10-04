const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET requests",
  });
});

router.post("/", (req, res, next) => {
  const product = {
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
  };

  res.status(200).json({
    message: "Handling POST requests",
    createdProduct: product,
  });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  if (id == "special") {
    res.status(200).json({
      message: "Special ID",
    });
  } else {
    res.status(200).json({
      message: `ID requested ${id}`,
    });
  }
});

router.patch("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "Handling PATCH requests",
  });
});

router.delete("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "Handling DELETE requests",
  });
});

module.exports = router;
