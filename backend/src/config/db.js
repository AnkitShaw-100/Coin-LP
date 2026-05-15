const mongoose = require("mongoose");

async function connectDatabase() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    return { connected: false, reason: "MONGODB_URI is not set" };
  }

  await mongoose.connect(mongoUri);
  return { connected: true };
}

module.exports = { connectDatabase };
