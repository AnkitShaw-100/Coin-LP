const express = require("express");
const { getExchangeRate } = require("../controllers/rateController");

const router = express.Router();

router.get("/", getExchangeRate);

module.exports = router;
