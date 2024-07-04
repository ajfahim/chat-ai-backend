import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import appRouter from "./routes/index.js";

config();

const app = express();

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://chat-ai-frontend-umber.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Logging middleware for debugging
app.use((req, res, next) => {
  console.log("Request Method:", req.method);
  console.log("Request Headers:", req.headers);
  next();
});

app.options(
  "*",
  cors({
    origin: [
      "http://localhost:5173",
      "https://chat-ai-frontend-umber.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Remove it in production
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1", appRouter);

export default app;
