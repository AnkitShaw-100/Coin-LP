const express = require("express");
const expenseRoutes = require("./expenseRoutes");
const rateRoutes = require("./rateRoutes");

const router = express.Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

router.use("/expenses", expenseRoutes);
router.use("/exchange-rate", rateRoutes);

module.exports = router;
