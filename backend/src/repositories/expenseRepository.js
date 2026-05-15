const crypto = require("node:crypto");
const mongoose = require("mongoose");
const { Expense } = require("../models/Expense");

const memoryStore = new Map();

function useDatabase() {
  return mongoose.connection.readyState === 1;
}

function cloneExpense(expense) {
  return {
    id: expense.id ?? expense._id ?? crypto.randomUUID(),
    userId: expense.userId,
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
    date: expense.date instanceof Date ? expense.date.toISOString() : new Date(expense.date).toISOString(),
    createdAt: expense.createdAt instanceof Date ? expense.createdAt.toISOString() : expense.createdAt,
    updatedAt: expense.updatedAt instanceof Date ? expense.updatedAt.toISOString() : expense.updatedAt,
  };
}

function getMemoryBucket(userId) {
  if (!memoryStore.has(userId)) {
    memoryStore.set(userId, []);
  }
  return memoryStore.get(userId);
}

async function listExpenses(userId) {
  if (useDatabase()) {
    const expenses = await Expense.find({ userId }).sort({ date: -1, createdAt: -1 });
    return expenses.map((expense) => expense.toJSON());
  }

  return getMemoryBucket(userId)
    .slice()
    .sort((left, right) => {
      const leftTime = new Date(left.date).getTime();
      const rightTime = new Date(right.date).getTime();
      return rightTime - leftTime;
    })
    .map(cloneExpense);
}

async function createExpense(data) {
  const payload = {
    userId: data.userId,
    title: data.title,
    amount: Number(data.amount),
    category: data.category,
    date: data.date ? new Date(data.date) : new Date(),
    _id: data.id ?? crypto.randomUUID(),
  };

  if (useDatabase()) {
    const created = await Expense.create(payload);
    return created.toJSON();
  }

  const stored = {
    id: payload._id,
    userId: payload.userId,
    title: payload.title,
    amount: payload.amount,
    category: payload.category,
    date: payload.date.toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const bucket = getMemoryBucket(payload.userId);
  bucket.unshift(stored);
  return cloneExpense(stored);
}

async function deleteExpense(userId, expenseId) {
  if (useDatabase()) {
    return Expense.findOneAndDelete({ _id: expenseId, userId });
  }

  const bucket = getMemoryBucket(userId);
  const index = bucket.findIndex((expense) => expense.id === expenseId);
  if (index === -1) {
    return null;
  }

  const [removed] = bucket.splice(index, 1);
  return cloneExpense(removed);
}

module.exports = {
  listExpenses,
  createExpense,
  deleteExpense,
};
