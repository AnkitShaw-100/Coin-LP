const express = require("express");
const {
  getExpenses,
  postExpense,
  removeExpense,
} = require("../controllers/expenseController");

const router = express.Router();

router.get("/", getExpenses);
router.post("/", postExpense);
router.delete("/:id", removeExpense);

module.exports = router;
