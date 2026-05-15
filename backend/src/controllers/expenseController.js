const { CATEGORIES } = require("../models/Expense");
const {
  listExpenses,
  createExpense,
  deleteExpense,
} = require("../repositories/expenseRepository");

function badRequest(message) {
  const error = new Error(message);
  error.status = 400;
  return error;
}

function notFound(message) {
  const error = new Error(message);
  error.status = 404;
  return error;
}

function validateExpensePayload(payload) {
  const userId = String(payload.userId ?? "").trim();
  const title = String(payload.title ?? "").trim();
  const category = String(payload.category ?? "").trim();
  const amount = Number(payload.amount);

  if (!userId) throw badRequest("userId is required");
  if (!title) throw badRequest("title is required");
  if (!Number.isFinite(amount) || amount <= 0) throw badRequest("amount must be greater than 0");
  if (!CATEGORIES.includes(category)) {
    throw badRequest(`category must be one of: ${CATEGORIES.join(", ")}`);
  }

  return {
    userId,
    title,
    amount,
    category,
    date: payload.date,
    id: payload.id,
  };
}

async function getExpenses(req, res, next) {
  try {
    const userId = String(req.query.userId ?? "").trim();
    if (!userId) throw badRequest("userId query parameter is required");

    const items = await listExpenses(userId);
    res.json({ items });
  } catch (error) {
    next(error);
  }
}

async function postExpense(req, res, next) {
  try {
    const payload = validateExpensePayload(req.body);
    const created = await createExpense(payload);
    res.status(201).json({ item: created });
  } catch (error) {
    next(error);
  }
}

async function removeExpense(req, res, next) {
  try {
    const expenseId = String(req.params.id ?? "").trim();
    const userId = String(req.query.userId ?? req.body?.userId ?? "").trim();

    if (!expenseId) throw badRequest("expense id is required");
    if (!userId) throw badRequest("userId is required");

    const removed = await deleteExpense(userId, expenseId);
    if (!removed) throw notFound("Expense not found");

    res.json({ item: removed });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getExpenses,
  postExpense,
  removeExpense,
};
