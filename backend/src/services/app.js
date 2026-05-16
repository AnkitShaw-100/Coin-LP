const express = require("express");
const cors = require("cors");
const routes = require("../routes");
const notFound = require("../middlewares/notFound");
const errorHandler = require("../middlewares/errorHandler");

const app = express();
const allowedOrigins = new Set(
  [
    process.env.FRONTEND_URL,
    process.env.CORS_ORIGIN,
    "https://coin-lp.vercel.app",
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:4173",
  ].filter(Boolean),
);

app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);
app.use(notFound);
app.use(errorHandler);

module.exports = { app };
