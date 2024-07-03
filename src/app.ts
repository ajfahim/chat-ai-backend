import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import appRouter from "./routes/index.js";

config();
const app = express();

const allowedOrigins = [
  "http://localhost:5173",  // Include localhost for local development
  "https://chat-ai-frontend-umber.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.options('*', cors()); // Handle preflight requests

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Remove it in production
if (process.env.NODE_ENV === 'development') {
  app.use(morgan("dev"));
}

app.use("/api/v1", appRouter);

export default app;
