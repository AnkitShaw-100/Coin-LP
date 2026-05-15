require("dotenv").config();
const { app } = require("./src/services/app");
const { connectDatabase } = require("./src/config/db");

const PORT = Number(process.env.PORT || 4000);

async function start() {
  try {
    const db = await connectDatabase();
    if (db.connected) {
      console.log("MongoDB connected");
    } else {
      console.log(`MongoDB skipped: ${db.reason}`);
    }

    app.listen(PORT, () => {
      console.log(`Backend listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start backend", error);
    process.exit(1);
  }
}

start();
